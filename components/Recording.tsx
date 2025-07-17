import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Audio } from "expo-av";
import { Button, Text } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

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
      setIsRecording(true);
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
      console.log(sound);
      console.log(status);
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
          <Text category="s2">
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <View
            style={{
              flexDirection: "row",
              margin: 5,
              justifyContent: "space-between",
            }}
          >
            <Button
              size="small"
              onPress={() => recordingLine.sound.replayAsync()}
            >
              ▶
            </Button>

            <Button
              size="small"
              appearance="outline"
              status="danger"
              onPress={() => {
                clearRecording(index);
              }}
              accessoryLeft={() => (
                <AntDesign name="delete" size={20} color="red" />
              )}
            ></Button>
          </View>
        </View>
      );
    });
  }
  function clearRecording(index) {
    setRecordings((currentRecordings) => {
      const updated = [...currentRecordings];
      updated.splice(index, 1);
      return updated;
    });
  }
  function clearRecordings() {
    setRecordings([]);
  }
  return (
    <View style={styles.container}>
      <View>
        <Button
          size="small"
          style={styles.buttonOne}
          onPress={isRecording ? stopRecording : startRecording}
          accessoryLeft={() => (
            <Entypo
              name={
                isRecording && recording
                  ? "controller-stop"
                  : "controller-record"
              }
              size={24}
              color={isRecording ? "black" : "red"}
            />
          )}
        ></Button>
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {getRecordingLines()}
        <StatusBar style="auto" />
      </ScrollView>
      {recordings.length > 0 && (
        <Button size="small" onPress={clearRecordings} appearance="ghost">
          Clear Recordings
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 1,
  },
  buttonOne: {
    backgroundColor: "#FFFFFF",
    width: 43,
    marginLeft: 5,
  },
  buttonTwo: {
    marginTop: 10,
  },
});
