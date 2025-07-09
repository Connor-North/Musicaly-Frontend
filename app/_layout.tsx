import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { supabase } from "../supabase/auth-helper";
import { Session } from "@supabase/supabase-js";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("session fetched:", session);
      setSession(session);
      setLoading(false);

      if (session) {
        router.replace("/(protected)");
      } else {
        router.replace("/sign-in");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);

      if (session) {
        router.replace("/(protected)");
      } else {
        router.replace("/sign-in");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // if (loading) {
  //   // TODO - Add loading spinner once Kitten UI Integrated
  //   return <LoadingScreen />; // Placeholder for loading
  // }

  return (
    <Stack>
      <Stack.Screen name="(app)" />
      <Stack.Screen name="sign-in" />
    </Stack>
  );
}
