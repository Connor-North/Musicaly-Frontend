import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StyleSheet, View } from "react-native";
import Metronome from "../Metronome";
import { useState, useRef } from "react";
import { Layout, Button } from "@ui-kitten/components";
import StopwatchTimer from "react-native-animated-stopwatch-timer";

global.__reanimatedWorkletInit = () => {};

export default function PSU() {
  const [sessionTime, setSessionTime] = useState<number>(0);
  console.log(sessionTime);
  const stopwatchRef = useRef(null);
  return (
    <>
      <Layout>
        <View style={styles.container}>
          <StopwatchTimer
            ref={stopwatchRef}
            containerStyle={styles.stopWatchContainer}
            animationDuration={0}
            digitStyle={Platform.select({
              ios: {
                width: 32,
              },
              android: undefined,
            })}
            separatorStyle={Platform.select({
              ios: {
                width: 14,
              },
              android: undefined,
            })}
            textCharStyle={styles.stopWatchChar}
            trailingZeros={0}
          />
          <View style={styles.buttonsContainer}>
            <Button onPress={() => stopwatchRef.current?.play()}>▶</Button>
            <Button
              onPress={() => {
                stopwatchRef.current?.pause();
                setSessionTime(stopwatchRef.current?.getSnapshot() / 60000);
              }}
            >
              ||
            </Button>
          </View>
        </View>
      </Layout>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ffffff",
  },
  stopWatchContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // backgroundColor: "black",
    // borderColor: "gray",
    borderRadius: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 240,
    paddingTop: 18,
  },
  stopWatchChar: {
    fontSize: 48,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#0256FF",
  },
});
