import { supabase } from "./auth-helper";

export async function handleSignOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      // TODO - Handle error here - maybe back to login page?
    }
  } catch (error) {
    console.error("Unexpected error during sign out:", error);
  }
}
