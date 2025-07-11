import { Layout, Button } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet } from "react-native";
import PSU from "./PSU";
import { useLocalSearchParams } from "expo-router";

const [sessionTime, setSessionTime] = useState<number>(0);

export default function PracticeSession() {
  const params = useLocalSearchParams<{
    title: string;
    id: string;
    composer: string;
  }>();

  return (
    <>
      <Layout style={styles.container}>
        <PSU setSessionTime={setSessionTime} unitId={params.id} />
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
