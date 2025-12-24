import db from "~~/lib/db";
import { insertLocationSchema, location } from "~~/lib/db/shcema";

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

  const [created] = await db.insert(location).values({
    ...result.data,
    slug: result.data.name.replaceAll(" ", "-").toLowerCase(),
    userId: event.context.user.id,
  }).returning();

  return created;
});
