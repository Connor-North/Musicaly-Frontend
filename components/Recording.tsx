import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import { Button } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";

type SingleRecording = {
  sound: Audio.Sound;
  duration: String;
  file: String | null;
};
export default function Recording() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<SingleRecording[]>([]);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [message, setMessage] = useState("");

  async function startRecording() {
    try {
      if (!permissionResponse || permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    if (!recording) return;
    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    if (!status.isLoaded || typeof status.durationMillis !== "number") {
      setRecording(null);
      return;
    }
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(updatedRecordings);
  }
  function getDurationFormatted(millis: number) {
    if (!millis || isNaN(millis)) return "0: 00";
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay} : ${secondsDisplay}`;
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
      <Button onPress={recording ? stopRecording : startRecording}>
        {recording ? "⬛" : "🔴"}
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
