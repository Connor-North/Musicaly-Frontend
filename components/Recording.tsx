import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import { Button } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

type SingleRecording = {
  sound: Audio.Sound;
  duration: String;
  file: String | null;
};
export default function Recording() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<SingleRecording[]>([]);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stopTime, setStopTime] = useState<number | null>(null);

  useEffect(() => {
    if (startTime !== null) {
      console.log("startTime updated:", startTime);
    }
  }, [startTime]);

  useEffect(() => {
    if (stopTime !== null) {
      console.log("stopTime updated:", stopTime);
    }
  }, [stopTime]);

  async function startRecording() {
    setIsRecording(true);
    const now = Date.now();
    setStartTime(now);
    try {
      if (!permissionResponse || permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      setStartTime(null);
      // TODO - deal with error states
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    console.log("Stopping recording..");
    if (!recording) {
      return;
    }
    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const now = Date.now();
      setStopTime(now);
      let updatedRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      if (!status.isLoaded) {
        setRecording(null);
        return;
      }

      const durationMillis = startTime ? now - startTime : 0;

      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(durationMillis),
        file: recording.getURI(),
      });
      setRecordings(updatedRecordings);
    } catch (err) {
      setRecording(null);
      setStopTime(null);
      // TODO - deal with error states
      console.log("error in stop recording", err);
    }
  }

  function getDurationFormatted(ms: number) {
    const seconds = Math.trunc(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const totalSeconds = seconds % 60;
    return `${minutes}:${totalSeconds.toString().padStart(2, "0")}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index}>
          <Text>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()}>
            Play
          </Button>
        </View>
      );
    });
  }
  return (
    <View style={styles.container}>
      <Button onPress={isRecording ? stopRecording : startRecording}>
        {isRecording ? "⬛" : "🔴"}
      </Button>
      {getRecordingLines()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 1,
  },
});
