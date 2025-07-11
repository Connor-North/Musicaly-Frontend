import { Layout, Button } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet } from "react-native";
import PSU from "./PSU";
import { useLocalSearchParams } from "expo-router";

export default function PracticeSession() {
  const [sessionTime, setSessionTime] = useState<number>(0);
  const { title, id, composer } = useLocalSearchParams();
  const unitId = Array.isArray(id) ? id[0] : id;

  return (
    <>
      <Layout style={styles.container}>
        <PSU setSessionTime={setSessionTime} unitId={unitId} />
      </Layout>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
