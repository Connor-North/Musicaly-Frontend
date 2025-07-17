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
    <SafeAreaView style={styles.container}>
      {/* <View>
          <Text style={{ margin: 5 }} category="h6">
            Total Session Time: {sessionTime} minutes
          </Text>
        </View> */}
      <View
        style={[
          styles.innerStyle,
          { maxHeight: screenHeight * 0.3, width: screenWidth * 0.8 },
        ]}
      >
        <PSU
          unitId={unitId}
          unitComposer={unitComposer}
          unitTitle={unitTitle}
        />
      </View>
      <View
        style={[
          styles.innerStyle,
          { maxHeight: screenHeight * 0.3, width: screenWidth * 0.8 },
        ]}
      >
        <View style={styles.recordingUnit}>
          <Card>
            <Text category="s2">Recordings</Text>
            <Recording />
          </Card>
        </View>
      </View>
      <View
        style={[
          styles.innerStyle,
          { maxHeight: screenHeight * 0.3, width: screenWidth * 0.8 },
        ]}
      >
        <View style={styles.recordingUnit}>
          <Card>
            <Input
              multiline={true}
              textStyle={styles.inputTextStyle}
              placeholder="Add Notes"
              {...multilineInputState}
              value={note}
              onChangeText={(value) => setNote(value)}
              style={{ width: "100%" }}
            />
            <Text status="primary" category="c2">
              Add a note before moving on. We learn quicker with short
              reflections. 🧠
            </Text>
            {note.length > 10 || unitTitle === "Free Play" ? (
              <View style={styles.innerDisplay}>
                <View>
                  <Button
                    status="danger"
                    onPress={() => {
                      handleSave(endSessionPath);
                    }}
                    style={styles.screenButton}
                  >
                    Finish
                  </Button>
                </View>

                <View>
                  <Button
                    onPress={() => handleSave(nextSessionPath)}
                    style={styles.screenButton}
                  >
                    &nbsp;Next&nbsp;
                  </Button>
                </View>
              </View>
            ) : (
              <View style={{ height: 52 }}></View>
            )}
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    marginVertical: 2,
  },
  innerStyle: {
    alignItems: "center",
  },
  recordingUnit: {
    width: screenWidth * 0.8,
  },
  innerDisplay: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputTextStyle: {
    height: 80,
    padding: 0,
  },
  screenButton: {
    marginTop: 10,
  },
});
