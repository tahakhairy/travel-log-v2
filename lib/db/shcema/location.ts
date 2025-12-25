import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from "./auth";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
  unique().on(t.name, t.userId),
]);

export const insertLocationSchema = createInsertSchema(location, {
  name: field => field.min(1, "Name is required").max(100),
  description: field => field.max(1000),
  lat: field => field.min(-90, `Latitude can't be less than -90`).max(90, `Latitude can't be greater than 90`),
  long: field => field.min(-180, `Longitude can't be less than -180`).max(180, `Longitude can't be greater than 180`),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});
