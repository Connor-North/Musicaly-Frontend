import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import MonthlyGoalsForm from "@/components/dashboard/MonthlyGoalForm";

export default function Dashboard() {
  return (
    <SafeAreaView
      className="justify-center flex-1 p-4 "
      style={styles.container}
    >
      <MonthlyGoalsForm />
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
});
