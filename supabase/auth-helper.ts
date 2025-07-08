import { AppState } from "react-native";
// import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

const url = SUPABASE_URL;
const anonkey = SUPABASE_ANON_KEY;

console.log(url);

const customStorageAdapter = {
  getItem: (key) => AsyncStorage.getItem(key),

  setItem: (key, value) => AsyncStorage.setItem(key, value),

  removeItem: (key) => AsyncStorage.removeItem(key),
};

console.log(url);

export const supabase = createClient(url, anonkey, {
  auth: {
    storage: customStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

// import { config as configDotenv } from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // const env = process.env.supabase;

// configDotenv({ path: path.resolve(__dirname, `../.env.supabase`) });
