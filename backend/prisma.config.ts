import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use DIRECT_URL (Port 5432) for CLI operations like db push and migrations
    url: env("DIRECT_URL") ?? env("DATABASE_URL"),
  },
});