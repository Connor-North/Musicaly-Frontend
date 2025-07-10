import { supabase } from "./auth-helper";
import { useRouter } from "expo-router";

export async function handleSignOut() {
  const router = useRouter();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      // TODO - Handle error here - maybe back to login page?
      return;
    }
    router.replace("/sign-in");
  } catch (error) {
    console.error("Unexpected error during sign out:", error);
  }
}
