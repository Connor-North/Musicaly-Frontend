import { Layout, Button } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet } from "react-native";
import PSU from "./PSU";

const [sessionTime, setSessionTime] = useState<number>(0);

export default function PracticeSesson() {
  return (
    <>
      <Layout style={styles.container}>
        <PSU setSessionTime={setSessionTime} unitId="string" />
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
