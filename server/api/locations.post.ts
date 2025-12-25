import type { DrizzleError } from "drizzle-orm";

import db from "~~/lib/db";
import { insertLocationSchema, location } from "~~/lib/db/shcema";
import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slug";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  const result = await readValidatedBody(event, insertLocationSchema.safeParse);
  const statusMessage = result.error?.issues
    .map(issue => `${issue.path.join("")}: ${issue.message}`)
    .join("; ");

  const errorData = result.error?.issues
    .reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);

  if (!result.success) {
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data: errorData,
    }));
  }

  const existingLocation = await db.query.location.findFirst({
    where: and(
      eq(location.name, result.data.name),
      eq(location.userId, event.context.user.id),
    ),
    columns: { id: true },
  });

  if (existingLocation) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exists.",
    }));
  }

  let slug = slugify(result.data.name);
  let existing = await db.query.location.findFirst({
    where: eq(location.slug, slug),
    columns: { id: true },
  });

  while (existing) {
    const suffix = customAlphabet("123456789abcdefghijklmnopqrstuvwxyz", 5)();
    slug = `${slug}-${suffix}`;

    existing = await db.query.location.findFirst({
      where: eq(location.slug, slug),
      columns: { id: true },
    });
  }

  try {
    const [created] = await db.insert(location).values({
      ...result.data,
      slug,
      userId: event.context.user.id,
    }).returning();

    return created;
  }
  catch (e) {
    const error = e as DrizzleError;

    return sendError(event, createError({
      statusCode: 409,
      statusMessage: error.message,
    }));
  }
});
