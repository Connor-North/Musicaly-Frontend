import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import UnitList from "@/components/units/UnitList";

export default function Library() {
  return (
    <SafeAreaView
      className="justify-center flex-1 p-4"
      style={styles.container}
    >
      <UnitList />
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
