import { supabase } from "./auth-helper";

async function handleSignOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      // Handle error (show alert, etc.)
    }
    // No need to navigate - your auth listener will detect the session change
    // and automatically redirect to the login screen
  } catch (error) {
    console.error("Unexpected error during sign out:", error);
  }
}

module.exports = { handleSignOut };
