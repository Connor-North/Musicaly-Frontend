import { Slot, useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase/auth-helper";
import { Session } from "@supabase/supabase-js";
import { View, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase/auth-helper";
import { Session } from "@supabase/supabase-js";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const hasNavigated = useRef(false);

  // NOTE - This works. But routing loops infinitely
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // FIXME - NOTE - Handle navigation separately - test this area for infinite loops
  useEffect(() => {
    if (loading) return;
    if (hasNavigated.current) return;
    if (session) {
      hasNavigated.current = true;
      router.replace("/(protected)");
    } else {
      hasNavigated.current = true;
      router.replace("/sign-in");
    }

    return () => {
      hasNavigated.current = false;
    };
  }, [session, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // FIXME: Return Slot component to render children
  return <Slot />;
}
