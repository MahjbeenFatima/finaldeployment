import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { externalUserId: self.id },
  });

  if (!user) {
    throw new Error("Not found");
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  console.log(`Searching for user with username: ${username}`);

  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { username }
  });

  if (!user) {
    console.log(`User not found: ${username}`);
    throw new Error("User not found");
  }

  if (self.username !== user.username) {
    throw new Error("Unauthorized");
  }
  console.log(`User found: ${JSON.stringify(user)}`);
  return user;
};
