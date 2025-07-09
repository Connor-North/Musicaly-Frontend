import { Text, View } from "react-native";
// import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/auth-helper";
import Auth from "../components/Auth";
import { Session } from "@supabase/supabase-js";

export default function SignInScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}
