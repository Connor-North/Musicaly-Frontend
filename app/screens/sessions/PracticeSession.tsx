import {
  Layout,
  Button,
  Input,
  InputProps,
  Text,
  Modal,
  Card,
} from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet } from "react-native";
import PSU from "./PSU";
import { useLocalSearchParams } from "expo-router";

export default function PracticeSession() {
  const [sessionTime, setSessionTime] = useState<number>(0);
  const { title, id, composer } = useLocalSearchParams();
  const unitId = Array.isArray(id) ? id[0] : id;
  const unitTitle = Array.isArray(title) ? title[0] : title;
  const unitComposer = Array.isArray(composer) ? composer[0] : composer;
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [note, setNote] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const handleSave = () => {
    if (!note) {
      setVisible(true);
    }
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };
  const handleEndSession = () => {};

  const useInputState = (initialValue = ""): InputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
  };
  const multilineInputState = useInputState();
  return (
    <>
      <Layout style={styles.container}>
        <PSU
          setSessionTime={setSessionTime}
          unitId={unitId}
          unitComposer={unitComposer}
          unitTitle={unitTitle}
        />
        <Modal visible={visible}>
          <Card disabled={true}>
            <Text>Welcome to UI Kitten 😻</Text>
            <Button onPress={() => setVisible(false)}>DISMISS</Button>
          </Card>
        </Modal>
        {isSaved ? <Text>"Note Saved"</Text> : <Text>&nbsp;</Text>}
        <Input
          multiline={true}
          textStyle={styles.inputTextStyle}
          placeholder="Add Notes"
          {...multilineInputState}
        />
        {/* <Button onPress={handleSave}>Save</Button> */}
        <Button status="danger" onPress={handleSave}>
          End Session
        </Button>
      </Layout>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 2,
  },
  inputTextStyle: {
    minHeight: 100,
  },
});
