import { Inngest } from "inngest";
import { connectDB } from "./connectDB.js";
import User from "../models/user.model.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

// Create an inngest client to send and receive events
export const inngest = new Inngest({ id: "talent-meet" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, first_name, last_name, email_addresses, image_url } =
        event.data; // getting the data from clerk

      const newUser = {
        clerkId: id,
        name: `${first_name || ""} ${last_name || ""}`.trim() || "Unknown",
        email: email_addresses[0]?.email_address, // primary email
        profileImage: image_url,
      };

      await User.create(newUser);

      await upsertStreamUser({
        id: newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profileImage,
      });
    } catch (error) {
      console.error("Error in sync-user inngest process:", error.message);
    }
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id } = event.data; // clerk user id
      // you should delete the user from stream before deleting it from DB
      await deleteStreamUser(id.toString());

      await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
      console.error(
        "Error in delete-user-from-db inngest process:",
        error.message,
      );
    }
  },
);

const updateUserProfile = inngest.createFunction(
  { id: "update-profile-image" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      await connectDB();

      const { id, image_url, first_name, last_name } = event.data;

      await User.findOneAndUpdate(
        { clerkId: id },
        {
          profileImage: image_url,
          name: `${first_name || ""} ${last_name || ""}`.trim() || "Unknown",
        },
      );

      await upsertStreamUser({
        id: id.toString(),
        name: `${first_name || ""} ${last_name || ""}`.trim() || "Unknown",
        image: image_url,
      });
    } catch (error) {
      console.error(
        "Error in update-user-profile inngest process:",
        error.message,
      );
    }
  },
);

export const functions = [syncUser, deleteUserFromDB, updateUserProfile];
