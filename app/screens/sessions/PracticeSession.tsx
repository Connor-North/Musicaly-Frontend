import {
  Layout,
  Button,
  Input,
  InputProps,
  Text,
  Card,
} from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, Modal, ScrollView } from "react-native";
import PSU from "./PSU";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PracticeSession() {
  const [sessionTime, setSessionTime] = useState<number>(0);
  const { title, id, composer } = useLocalSearchParams();
  const unitId = Array.isArray(id) ? id[0] : id;
  const unitTitle = Array.isArray(title) ? title[0] : title;
  const unitComposer = Array.isArray(composer) ? composer[0] : composer;
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const [visible, setVisible] = useState(false);

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
