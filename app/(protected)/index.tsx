import { Button, StyleSheet, Text, View } from "react-native";
import { handleSignOut } from "../../supabase/supabase-signout";
import WeeklyChart from "@/components/Weeklychart";
import { useState } from "react";

export default function Index() {
  const [disableSignOutButton, setDisableSignOutButton] = useState(false);

  async function signOut() {
    setDisableSignOutButton(true);
    await handleSignOut();
    setDisableSignOutButton(false);
  }

  return (
    <View style={styles.container}>
      <WeeklyChart />
      <View style={styles.main}>
        <Text style={styles.title}>Hello Protected World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
      <Button title={"Sign Out"} onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
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
