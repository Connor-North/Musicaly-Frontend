import { createClient } from "@supabase/supabase-js";
import { config as configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const env = process.env.supabase;

configDotenv({ path: path.resolve(__dirname, `../.env.supabase`) });

console.log("Supabase URL:", process.env.SUPABASE_URL);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function fetchAllFromTable(table) {
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    console.log(`Error fetching data:\n${error}`);
    return null;
  }
  console.log(data);
  return data;
}

fetchAllFromTable("students");
