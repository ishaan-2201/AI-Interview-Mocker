import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",

  dbCredentials: {
    url: "postgresql://neondb_owner:npg_3eiOvZKYIJ6D@ep-frosty-resonance-a8g0qnyo-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require",
  },
  strict: true,
  verbose: true,
});
