import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const usersImageTable = sqliteTable('usersImage', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userID: text('userId').notNull(), //Got From Clerk
    image: text('image').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    createdAt: text('created_at')
        .default(sql`(CURRENT_TIMESTAMP)`)
        .notNull(),
});

export type UserImagesInsert = typeof usersImageTable.$inferInsert;
export type UserImagesSelect = typeof usersImageTable.$inferSelect;