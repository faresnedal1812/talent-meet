import { Inngest } from "inngest";
import { connectDB } from "./connectDB";
import User from "../models/user.model.js";

// Create an inngest client to send and receive events
export const inngest = new Inngest({ id: "talent-meet" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
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

    // todo: do sth else
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.findOneAndDelete({ clerkId: id });

    // todo: do sth else
  },
);

const updateProfileImage = inngest.createFunction(
  { id: "update-profile-image" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();

    const { id, image_url } = event.data;

    await User.findOneAndUpdate({ clerkId: id }, { profileImage: image_url });

    // todo: do sth else
  },
);

export const functions = [syncUser, deleteUserFromDB, updateProfileImage];
