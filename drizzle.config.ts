import { defineConfig } from "drizzle-kit";

import env from "./app/utils/env";

export default defineConfig({
  out: "./shared/db/migrations",
  schema: "./shared/db/shcema/index.ts",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,
  },
});
