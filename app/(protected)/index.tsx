import { Button, StyleSheet, Text, View } from "react-native";
import { handleSignOut } from "../../supabase/supabase-signout";
import WeeklyChart from "@/components/Weeklychart";

export default function Index() {
  return (
    <View style={styles.container}>
      <WeeklyChart />
      <View style={styles.main}>
        <Text style={styles.title}>Hello Protected World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
      <Button title={"Sign Out"} onPress={() => handleSignOut} />
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
