import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/session.model.js";

export const createSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and difficulty are required" });
    }

    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;

    // create session in db
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });
    // create stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() }, // not nessesary
      },
    });

    // create stream chat channel

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

    res.status(201).json(session);
  } catch (error) {
    console.log("Error in createSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getActiveSession = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(sessions);
  } catch (error) {
    console.log("Error in getActiveSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyRecentSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(sessions);
  } catch (error) {
    console.log("Error in getMyRecentSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id: sessionId } = req.params;

    const session = await Session.findById(sessionId)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    console.log("Error in getSessionById controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// only participant can join to the session
export const joinSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: sessionId } = req.params;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status === "completed") {
      return res
        .status(403)
        .json({ message: "Cannot join to completed session" });
    }

    if (session.host.toString() === userId.toString()) {
      return res
        .status(403)
        .json({ message: "Host cannot join their own session as participant" });
    }

    const updatedSession = await Session.findOneAndUpdate(
      {
        _id: sessionId,
        participant: null,
        status: "active",
      },
      { participant: userId },
      { new: true },
    );

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    res.status(200).json(updatedSession);
  } catch (error) {
    console.log("Error in joinSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// only host can end the session
export const endSession = async (req, res) => {
  try {
    const { id: sessionId } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status === "completed") {
      return res.status(403).json({ message: "Session is already completed" });
    }

    if (session.host.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Only the host can end the session" });
    }

    // delete stream video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // delete stream chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
