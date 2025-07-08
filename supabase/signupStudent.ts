// auth.js or auth.ts
import { supabase } from "../supabase/auth-helper";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

// Signup function that calls our Edge Function
export async function signupStudent(email, password) {
  const url = SUPABASE_URL;
  const anonkey = SUPABASE_ANON_KEY;
  try {
    // Call the Edge Function
    const response = await fetch(`${url}/functions/v1/signup-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include anon key for authorization to call the Edge Function
        Authorization: `Bearer ${anonkey}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      return { success: false, error: data.error };
    }

    // If signup was successful, we can automatically sign in the user
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return {
        success: false,
        error:
          "Account created but could not sign in automatically. Please sign in manually.",
      };
    }

    return { success: true, user: data.user };
  } catch (err) {
    console.error("Signup error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
