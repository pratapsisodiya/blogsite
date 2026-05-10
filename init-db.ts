import * as dotenv from "dotenv";
dotenv.config(); // Load .env
dotenv.config({ path: ".env.local", override: true }); // Load .env.local

import { initDB } from "./lib/db";

async function main() {
  console.log("Starting database initialization...");
  await initDB();
  console.log("Done.");
}

main().catch(console.error);
