"use server";

import { db } from "@/db";
import { UserImagesSelect, usersImageTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getMyLogo = async (): Promise<UserImagesSelect[]> => {
  const { userId } = await auth();
  if(!userId){
    throw Error("Failed!");
  }
  return await db.query.usersImage.findMany({
    where: eq(usersImageTable.userID, userId!),
  });
};
