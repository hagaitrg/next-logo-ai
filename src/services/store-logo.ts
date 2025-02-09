"use server";

import { db } from "@/db";
import { UserImagesInsert, usersImageTable } from "@/db/schema";

export const storeLogo = async (payload: UserImagesInsert) => {
  await db.insert(usersImageTable).values(payload);
};
