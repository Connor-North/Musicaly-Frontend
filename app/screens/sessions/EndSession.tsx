import React, { useCallback, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Layout, Input, InputProps, Button } from "@ui-kitten/components";
import { SessionTimeContext } from "@/assets/contexts/sessionTime";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { supabase } from "@/supabase/auth-helper";

export default function EndScreen() {
  const router = useRouter();

  const context = useContext(SessionTimeContext);
  if (!context) {
    throw new Error("SessionTimeContext must be used within a SessionProvider");
  }
  const {
    sessionTime,
    setSessionTime,
    setPracticeSessionId,
    practiceSessionId,
  } = context;

  const [note, setNote] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const useInputState = (initialValue = ""): InputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
  };
  const multilineInputState = useInputState();

  async function handleEndSession() {
    try {
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("practice_sessions")
        .update([
          {
            notes: note,
            duration: Math.round(sessionTime),
            rating: rating,
            ended_at: new Date().toLocaleString("en-US", {
              timeZone: "Europe/London",
            }),
          },
        ])
        .eq("id", practiceSessionId)
        .select("*");

      if (error) {
        console.error("Error inserting unit:", error.message);
        // TODO - deal with error handling
        return;
      }

      if (data) {
        setSessionTime(0);
        setPracticeSessionId(null);
        router.push("/(protected)");
      }
    } catch (error) {
      console.error("Error inserting unit:", error);
    }
  }

  return (
    <Layout style={styles.root}>
      <Text category="h4">
        Good job! You practiced for {Math.round(sessionTime)} minutes in this
        session!
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
          onValueChange={(value) => {
            setRating(value);
          }}
        />

        <Button
          style={{ marginTop: 50 }}
          status="primary"
          onPress={() => {
            handleEndSession();
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
