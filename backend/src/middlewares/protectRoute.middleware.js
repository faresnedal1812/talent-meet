import User from "../models/user.model.js";
import { requireAuth, clerkClient } from "@clerk/express";
import { upsertStreamUser } from "../lib/stream.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId; // userId is clerkId

      if (!clerkId) {
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });
      }

      let user = await User.findOne({ clerkId });

      if (!user) {
        // Fallback: If Inngest sync failed or was delayed, sync user manually.
        try {
          const clerkUser = await clerkClient.users.getUser(clerkId);
          const newUser = {
            clerkId,
            name:
              `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
              "Unknown",
            email: clerkUser.emailAddresses[0]?.emailAddress,
            profileImage: clerkUser.imageUrl,
          };
          user = await User.create(newUser);

          await upsertStreamUser({
            id: user.clerkId.toString(),
            name: user.name,
            image: user.profileImage,
          });
        } catch (syncError) {
          console.error(
            "Error during manual user sync fallback:",
            syncError.message,
          );
        }
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
