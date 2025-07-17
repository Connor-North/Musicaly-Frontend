import { Button, Input, InputProps, Text, Card } from "@ui-kitten/components";
import { useState, useContext, useRef, useEffect } from "react";
import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import PSU from "./PSU";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionTimeContext } from "@/assets/contexts/sessionTime";
import Recording from "@/components/Recording";
import { supabase } from "@/supabase/auth-helper";

export default function PracticeSession() {
  const context = useContext(SessionTimeContext);
  if (!context) {
    throw new Error("SessionTimeContext must be used within a SessionProvider");
  }
  const { sessionTime, setSessionTime, unitTime, setUnitTime } = context;
  const { title, unit_id, composer, practice_session_id } =
    useLocalSearchParams();
  const unitId = Array.isArray(unit_id) ? unit_id[0] : unit_id;
  const unitTitle = Array.isArray(title) ? title[0] : title;
  const practiceSessionId = Array.isArray(practice_session_id)
    ? practice_session_id[0]
    : practice_session_id;
  const unitComposer = Array.isArray(composer) ? composer[0] : composer;
  const [note, setNote] = useState<string>("");
  const router = useRouter();
  const createdAt = new Date().toLocaleString("en-US", {
    timeZone: "Europe/London",
  });
  const nextSessionPath = "/(protected)/new-session";
  const endSessionPath = "/screens/sessions/EndSession";

  const unitTimeRef = useRef(unitTime);
  const screenHeight = Dimensions.get("window").height;
  useEffect(() => {
    unitTimeRef.current = unitTime;
  }, [unitTime]);

  async function handleSave(navPath: any) {
    const time = Math.floor(unitTimeRef.current);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("practice_sessions_units")
        .insert([
          {
            unit_id: unitId,
            practice_session_id: practiceSessionId,
            unit_comment: note,
            created_at: createdAt,
            duration: time,
            ended_at: new Date().toLocaleString("en-US", {
              timeZone: "Europe/London",
            }),
          },
        ])
        .select("*");

      if (error) {
        console.error("Error inserting unit:", error.message);
        // TODO - deal with error handling
        return;
      }

      if (data) {
        setSessionTime((prev) => prev + unitTime);
        setUnitTime(0);
        router.push(navPath);
      }
    } catch (error) {
      console.error("Error inserting unit:", error);
    }
  }

  const useInputState = (initialValue = ""): InputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
  };
  const multilineInputState = useInputState();
  return (
    <>
      <SafeAreaView
        // className="justify-center flex-1 p-4"
        style={styles.container}
      >
        <View style={{ maxHeight: screenHeight * 0.2 }}>
          <Text style={{ margin: 5 }} category="h6">
            Total Session Time: {sessionTime} minutes
          </Text>

          <PSU
            unitId={unitId}
            unitComposer={unitComposer}
            unitTitle={unitTitle}
          />
        </View>
        <View style={{ maxHeight: screenHeight * 0.2 }}>
          <Recording />
        </View>
        <View style={{ maxHeight: screenHeight * 0.2 }}>
          {/* <Text>&nbsp;</Text> */}
          <Input
            multiline={true}
            textStyle={styles.inputTextStyle}
            placeholder="Add Notes"
            {...multilineInputState}
            value={note}
            onChangeText={(value) => setNote(value)}
          />
          {/* <Text>&nbsp;</Text>
          <Text>&nbsp;</Text> */}
          {note.length > 10 || unitTitle === "Free Play" ? (
            <>
              <Button
                onPress={() => handleSave(nextSessionPath)}
                style={styles.screenButton}
              >
                Next Piece
              </Button>
              {/* <Text>&nbsp;</Text> */}
              <Button
                status="danger"
                onPress={() => {
                  handleSave(endSessionPath);
                }}
                style={styles.screenButton}
              >
                End Session
              </Button>
            </>
          ) : (
            <Card style={{ width: 270 }}>
              <Text status="primary" category="s2">
                Remember to add a note before moving on.{"\n"}We learn quicker
                with short reflections on each piece we practice. 🧠
              </Text>
            </Card>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    marginVertical: 2,
  },
  inputTextStyle: {
    minHeight: 100,
    width: 240,
    padding: 0,
  },
  screenButton: {
    width: 240,
  },
  // viewHeightThirty: { height: screenHeight * 0.3 },
});
