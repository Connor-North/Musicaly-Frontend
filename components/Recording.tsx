import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Button } from "@ui-kitten/components";

export default function Recording() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
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
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  }

  return (
    <View style={styles.container}>
      <Button onPress={recording ? stopRecording : startRecording}>
        {recording ? "⬛" : "🔴"}
      </Button>
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
