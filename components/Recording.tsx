import { useState } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { Audio } from "expo-av";
import { Button } from "@ui-kitten/components";
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
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stopTime, setStopTime] = useState<number | null>(null);
  // const screenWidth = Dimensions.get("window").width;
  // const screenHeight = Dimensions.get("window").height;

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
          <Text>
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Button
              style={styles.button}
              onPress={() => recordingLine.sound.replayAsync()}
            >
              Play
            </Button>
            <View style={{ padding: 5 }}>
              <Button
                onPress={clearRecording}
                accessoryLeft={() => (
                  <AntDesign name="delete" size={24} color="black" />
                )}
              ></Button>
            </View>
          </View>
        </View>
      );
    });
  }
  function clearRecording() {
    setRecording(null);
  }
  function clearRecordings() {
    setRecordings([]);
  }
  return (
    <View style={styles.container}>
      {/* <View style={[{ height: screenHeight * 0.4, width: screenWidth * 0.9 }]}> */}
      <Button
        style={styles.buttonOne}
        onPress={isRecording ? stopRecording : startRecording}
        accessoryLeft={() => (
          <Entypo
            name={
              isRecording && recording ? "controller-stop" : "controller-record"
            }
            size={24}
            color={isRecording ? "black" : "red"}
          />
        )}
      ></Button>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        {getRecordingLines()}
        <StatusBar style="auto" />
      </ScrollView>
      {/* <Button
          accessoryLeft={() => (
            <AntDesign name="delete" size={24} color="black" />
          )}
        ></Button> */}

      {recordings.length > 0 && (
        <Button
          style={styles.buttonTwo}
          onPress={clearRecordings}
          appearance="ghost"
        >
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

    marginBottom: 5,
    height: 60,
    borderRadius: 5,
    width: 120,
  },
  button: { width: 120, height: 60 },
  buttonTwo: {
    marginTop: 10,
  },
});
