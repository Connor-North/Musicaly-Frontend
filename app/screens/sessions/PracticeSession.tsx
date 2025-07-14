import {
  Layout,
  Button,
  Input,
  InputProps,
  Text,
  Card,
} from "@ui-kitten/components";
import { useState, useContext } from "react";
import { StyleSheet, Modal, ScrollView } from "react-native";
import PSU from "./PSU";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SessionTimeContext } from "@/assets/contexts/sessionTime";

export default function PracticeSession() {
  const context = useContext(SessionTimeContext);
  if (!context) {
    throw new Error("SessionTimeContext must be used within a SessionProvider");
  }
  const { sessionTime, setSessionTime } = context;
  const { title, id, composer } = useLocalSearchParams();
  const unitId = Array.isArray(id) ? id[0] : id;
  const unitTitle = Array.isArray(title) ? title[0] : title;
  const unitComposer = Array.isArray(composer) ? composer[0] : composer;
  const [note, setNote] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleSave = () => {};

  const useInputState = (initialValue = ""): InputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
  };
  const multilineInputState = useInputState();
  return (
    <>
      <ScrollView>
        <SafeAreaView
          className="justify-center flex-1 p-4"
          style={styles.container}
        >
          <Text style={{ margin: 20 }} category="h6">
            Total Session Time: {sessionTime} minutes
          </Text>

          <PSU
            setSessionTime={setSessionTime}
            unitId={unitId}
            unitComposer={unitComposer}
            unitTitle={unitTitle}
          />
          <Text>&nbsp;</Text>
          <Input
            multiline={true}
            textStyle={styles.inputTextStyle}
            placeholder="Add Notes"
            {...multilineInputState}
            value={note}
            onChangeText={(value) => setNote(value)}
          />
          <Text>&nbsp;</Text>

          <Text>&nbsp;</Text>
          {note.length > 10 || unitTitle === "Free Play" ? (
            <>
              <Button
                onPress={() => router.navigate("/(protected)/new-session")}
                style={styles.screenButton}
              >
                Next Piece
              </Button>
              <Text>&nbsp;</Text>
              <Button
                status="danger"
                onPress={() => router.navigate("/screens/sessions/EndSession")}
                style={styles.screenButton}
              >
                End Session
              </Button>
            </>
          ) : (
            <Card style={{ width: 270 }}>
              <Text status="primary" category="h6">
                Remember to add a note before moving on.{"\n"}We learn quicker
                with short reflections on each piece we practice. 🧠
              </Text>
            </Card>
          )}
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
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
    minHeight: 100,
    width: 240,
    padding: 0,
  },
  screenButton: {
    width: 240,
  },
});
