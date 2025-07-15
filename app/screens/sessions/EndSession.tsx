import React, { useCallback, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Layout, Input, InputProps, Button } from "@ui-kitten/components";
import { SessionTimeContext } from "@/assets/contexts/sessionTime";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";

export default function EndScreen() {
  const router = useRouter();

  const context = useContext(SessionTimeContext);
  if (!context) {
    throw new Error("SessionTimeContext must be used within a SessionProvider");
  }
  const { sessionTime, setSessionTime } = context;

  const [note, setNote] = useState<string>("");

  const useInputState = (initialValue = ""): InputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
  };
  const multilineInputState = useInputState();

  return (
    <Layout style={styles.root}>
      <Text category="h4">
        Good job today! You practiced for {sessionTime} minutes!
      </Text>
      <Text>&nbsp;</Text>
      <Text>
        Remember, it's not about streaks or going through the motions. It's
        about quality. So, take the time to think about the following and make
        some notes for next time:
      </Text>
      <Text>&nbsp;</Text>
      <Text>🎉 - What can you celerate today?</Text>
      <Text>🧠 - Where did you have to focus?</Text>
      <Text>✅ - What could you aim for next?</Text>
      <Text>🎯 - Are you meeting your goals?</Text>
      <Text>&nbsp;</Text>
      <View style={styles.root}>
        <Input
          multiline={true}
          textStyle={styles.inputTextStyle}
          placeholder="Add Notes"
          {...multilineInputState}
          value={note}
          onChangeText={(value) => setNote(value)}
        />

        <Text>&nbsp;</Text>
        <Text>Finally, on reflection ... rate your session.</Text>
        <Text>&nbsp;</Text>
        <Slider
          style={{ width: 250 }}
          minimumValue={0}
          maximumValue={5}
          thumbTintColor={"#3366ff"}
          minimumTrackTintColor={"#A6C1FF"}
          step={1}
          renderStepNumber
        />

        <Button
          style={{ marginTop: 50 }}
          status="primary"
          onPress={() => {
            router.navigate("/(protected)");
          }}
        >
          End Session
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    marginTop: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    marginVertical: 2,
  },
  inputTextStyle: {
    minHeight: 200,
    width: 240,
    padding: 0,
  },
});
