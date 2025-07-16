import { Platform, StyleSheet, View } from "react-native";
import Metronome from "../../../components/Metronome";
import { useState, useRef, useEffect, useContext } from "react";
import { Layout, Button, Text, Card } from "@ui-kitten/components";
import StopwatchTimer from "react-native-animated-stopwatch-timer";
import React from "react";
import { SessionTimeContext } from "@/assets/contexts/sessionTime";

global.__reanimatedWorkletInit = () => {};

interface PSUProps {
  unitId: string;
  unitComposer: string;
  unitTitle: string;
}

export default function PSU({ unitId, unitComposer, unitTitle }: PSUProps) {
  const context = useContext(SessionTimeContext);
  if (!context) {
    throw new Error("SessionTimeContext must be used within a SessionProvider");
  }
  const { unitTime, setUnitTime, sessionTime, setSessionTime } = context;

  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      stopwatchRef.current?.play();

      interval = setInterval(() => {
        const snapshotMs = stopwatchRef.current?.getSnapshot?.();
        const minutes = snapshotMs / 60000;
        setUnitTime(minutes);
      }, 1000); // NOTE - every second?? Consider every 5s if performance matters on testing
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const stopwatchRef = useRef<any>(null);

  return (
    <View style={styles.container}>
      <Card>
        <Text category="h6">{unitTitle}</Text>
        <Text category="s1">{unitComposer}</Text>
        <StopwatchTimer
          ref={stopwatchRef}
          containerStyle={styles.stopWatchContainer}
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
          <Button
            onPress={() => {
              if (isRunning) {
                stopwatchRef.current?.pause();
                setIsRunning(false);
              } else {
                stopwatchRef.current?.play();
                setIsRunning(true);
              }
            }}
          >
            {!isRunning ? "▶" : "||"}
          </Button>
        </View>
        <Metronome tempo={80} />
      </Card>
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
    marginTop: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
