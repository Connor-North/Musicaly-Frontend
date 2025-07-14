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
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    if (note.length < 2) {
      setVisible(true);
      return;
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

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
          <Modal
            visible={visible}
            backdropColor={"rgba(0, 0, 0, 0.5)"}
            presentationStyle="overFullScreen"
            style={styles.container}
          >
            <Card disabled={true} style={{ width: "80%" }}>
              <Text>
                You've not entered any notes for your practice of {unitTitle} by{" "}
                {unitComposer} ...
                <p>Do you want to add any notes, or end the session?</p>
              </Text>
              <Button onPress={() => setVisible(false)}>Add Notes</Button>
              <p></p>
              <Button status="danger" onPress={() => setVisible(false)}>
                End Session
              </Button>
            </Card>
          </Modal>
          {isSaved ? <Text>"Note Saved"</Text> : <Text>&nbsp;</Text>}
          <Input
            multiline={true}
            textStyle={styles.inputTextStyle}
            placeholder="Add Notes"
            {...multilineInputState}
            value={note}
            onChangeText={(value) => setNote(value)}
            style={{ width: "80%" }}
          />
          <Button onPress={() => router.navigate("/(protected)/new-session")}>
            Next piece
          </Button>
          <Button status="danger" onPress={handleSave}>
            End Session
          </Button>
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
  },
});
