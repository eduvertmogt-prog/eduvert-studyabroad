import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line.includes("=") && !line.startsWith("#"))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);

const url = env.DATABASE_URL_UNPOOLED;
if (!url) {
  throw new Error("DATABASE_URL_UNPOOLED is missing");
}

const sql = neon(url);
await sql.query(readFileSync("db/migrations/001_enquiries.sql", "utf8"));
const rows = await sql`select current_database() as db, to_regclass('public.enquiries')::text as enquiries`;
console.log(JSON.stringify(rows[0]));
