import { chatClient } from "../lib/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    // use clerkId for Stream token (not mongodb _id)=> it should match the id we have in the stream dashboard
    const token = chatClient.createToken(req.user.clerkId); // token is nessesary for video calling and send messages over stream
    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.error("Error in createStreamToken controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
