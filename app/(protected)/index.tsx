import { Button, StyleSheet, Text, View } from "react-native";
import { handleSignOut } from "../../supabase/supabase-signout";
import WeeklyChart from "@/components/Weeklychart";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [disableSignOutButton, setDisableSignOutButton] = useState(false);

  async function signOut() {
    setDisableSignOutButton(true);
    await handleSignOut();
    setDisableSignOutButton(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <WeeklyChart />
      <Button title={"Sign Out"} onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960, // NOTE - Is hard-coding right, i.e. what if on a tablet with landscape orientation
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
