import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, StyleSheet, View } from "react-native";
import Metronome from "../Metronome";
import { useState, useRef } from "react";
import { Layout, Button } from "@ui-kitten/components";
import StopwatchTimer from "react-native-animated-stopwatch-timer";
import React from "react";

global.__reanimatedWorkletInit = () => {};

interface PSUProps {
  setSessionTime: React.Dispatch<React.SetStateAction<number>>;
  unitId: string;
}

export default function PSU({ setSessionTime, unitId }: PSUProps) {
  const [unitTime, setUnitTime] = useState<number>(0);
  console.log(unitTime);
  const stopwatchRef = useRef<any>(null);

  function endUnit() {
    setSessionTime((prev) => prev + unitTime);
  }

  return (
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
            setUnitTime(stopwatchRef.current?.getSnapshot() / 60000);
          }}
        >
          ||
        </Button>
        <Button onPress={endUnit}>⬜</Button>

        {/* TODO -  On unit end, take props and update. Maybe get rid of the extra useState in here?*/}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stopWatchContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
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
