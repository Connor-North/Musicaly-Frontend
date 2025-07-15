import { View, StyleSheet, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Input, Radio, RadioGroup } from "@ui-kitten/components";
import React, { useEffect, useContext } from "react";
import UnitList from "@/components/units/UnitList";
import { useRouter } from "expo-router";
import { supabase } from "@/supabase/auth-helper";
import { SessionTimeContext } from "@/assets/contexts/sessionTime";
import { Audio } from "expo-av";

export default function NewSession() {
  const context = useContext(SessionTimeContext);
  if (!context) {
    throw new Error("SessionTimeContext must be used within a SessionProvider");
  }
  const { practiceSessionId, setPracticeSessionId } = context;

  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [remountKey, setRemountKey] = React.useState<number>(0);

  const [quizVisible, setQuizVisible] = React.useState(false);
  const [quizStep, setQuizStep] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(
    null
  );

  const quizQuestions = [
    {
      file: require("../../assets/sounds/F.mp3"),
      options: ["F4 ✅", "C4", "E4", "G4"],
    },
    {
      file: require("../../assets/sounds/D.mp3"),
      options: ["C4", "D4 ✅", "G4", "F4"],
    },
    {
      file: require("../../assets/sounds/G.mp3"),
      options: ["G4 ✅", "D4", "F4", "C4"],
    },
    {
      file: require("../../assets/sounds/E.mp3"),
      options: ["F4", "E4 ✅", "D4", "C4"],
    },
    {
      file: require("../../assets/sounds/C.mp3"),
      options: ["C4 ✅", "D4", "E4", "F4"],
    },
  ];

  async function playNote(file: any) {
    const { sound } = await Audio.Sound.createAsync(file);
    await sound.playAsync();
  }

  function closeQuiz() {
    setQuizVisible(false);
    setQuizStep(0);
    setSelectedAnswer(null);
  }

  async function insertUnit() {
    let collection;
    if (selectedIndex === 0) {
      collection = "Repertoire";
    } else {
      collection = "Technical Exercises";
    }
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("units")
        .insert([
          {
            student_id: user?.id,
            composer: artist,
            created_at: new Date().toLocaleString("en-US", {
              timeZone: "Europe/London",
            }),
            title: title,
            collection: collection,
          },
        ])
        .select("id, composer, created_at, title, collection");

      if (error) {
        console.error("Error inserting unit:", error.message);

        return;
      }

      if (data) {
        console.log("New unit inserted:", data[0]);
        insertNewSession(data);
      }
    } catch (error) {
      console.error("Error inserting unit:", error);
    }
  }

  // Start here -----------------V
  async function insertNewSession(item: any) {
    if (practiceSessionId) {
      router.push({
        pathname: "/screens/sessions/PracticeSession",
        params: {
          title: item.title,
          unit_id: item.id,
          composer: item.composer,
          practice_session_id: practiceSessionId,
        },
      });
      return;
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("practice_sessions")
        .insert([
          {
            student_id: user?.id,
            created_at: new Date().toLocaleString("en-US", {
              timeZone: "Europe/London",
            }),
          },
        ])
        .select("id");

      if (error) {
        console.error("Error inserting unit:", error.message);
        // TODO: Error handling here
        return;
      }

      if (data) {
        setPracticeSessionId(data[0].id);
        router.push({
          pathname: "/screens/sessions/PracticeSession",
          params: {
            title: item.title,
            unit_id: item.id,
            composer: item.composer,
            practice_session_id: data[0].id,
          },
        });
      }
    } catch (error) {
      console.error("Error inserting unit:", error);
    }
  }

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ScrollView>
      <SafeAreaView
        className="justify-center flex-1 p-4"
        style={styles.container}
      >
        {/* TODO - Arrange items on page with layout containers */}
        <UnitList
          remountKey={remountKey}
          buttonText="Start"
          onButtonPress={(item) => {
            insertNewSession(item);
          }}
        />

        <Button style={styles.button} onPress={toggleModal}>
          Add New Piece
        </Button>

        {/* <Button
          style={styles.button}
          onPress={() => {
            router.push({
              pathname: "/screens/sessions/PracticeSession",
              params: {
                title: "Free Play",
                id: "",
                composer: "Sight read, create, jam..!",
              },
            });
          }}
        >
          Free Practice
        </Button> */}

        <Button style={styles.button} onPress={() => setQuizVisible(true)}>
          Note Recognition Quiz
        </Button>

        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.mainView}>
            <View style={styles.view} className="p-12 rounded-lg bg-white">
              <Text category="h3">
                Please enter the details for the new piece you'd like to
                practice.
              </Text>
              <Text>&nbsp;</Text>
              <Input
                placeholder={"Title"}
                onChangeText={(text) => setTitle(text)}
                value={title}
              />
              <Text>&nbsp;</Text>
              <Input
                placeholder={"Artist"}
                onChangeText={(text) => setArtist(text)}
                value={artist}
              />
              <Text>&nbsp;</Text>
              <Text category="h6">
                Is this piece part of your repertoire, or a technical exercise?
              </Text>
              <Text>&nbsp;</Text>
              <RadioGroup
                selectedIndex={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
              >
                <Radio>Repertoire</Radio>
                <Radio>Technical Exercises</Radio>
              </RadioGroup>
              <Text>&nbsp;</Text>
              {title.length < 1 || artist.length < 1 ? (
                <Text style={{ color: "red" }}>
                  Please ensure all fields are complete
                </Text>
              ) : (
                <Button
                  onPress={() => {
                    insertUnit();
                  }}
                >
                  Let's practice!
                </Button>
              )}
            </View>
          </View>
        </Modal>

        <Modal
          visible={quizVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={closeQuiz}
        >
          <View style={styles.mainView}>
            <View style={styles.view} className="p-12 rounded-lg bg-white">
              <Text category="h4">Question {quizStep + 1} of 5</Text>
              <Text>&nbsp;</Text>
              <Button onPress={() => playNote(quizQuestions[quizStep].file)}>
                🔊 Play Note
              </Button>
              <Text>&nbsp;</Text>
              {quizQuestions[quizStep].options.map((opt, index) => {
                const isCorrect = opt.includes("✅");
                const displayText = opt.replace(" ✅", "");
                let status = "default";

                if (selectedAnswer) {
                  if (selectedAnswer === displayText && isCorrect) {
                    status = "success";
                  } else if (selectedAnswer === displayText && !isCorrect) {
                    status = "danger";
                  } else if (isCorrect) {
                    status = "success";
                  }
                }

                return (
                  <Button
                    key={index}
                    style={{ marginVertical: 4 }}
                    status={status}
                    onPress={() => {
                      if (!selectedAnswer) setSelectedAnswer(displayText);
                    }}
                  >
                    {displayText}
                  </Button>
                );
              })}
              {selectedAnswer && (
                <>
                  <Text>&nbsp;</Text>
                  <Button
                    onPress={() => {
                      if (quizStep < quizQuestions.length - 1) {
                        setQuizStep(quizStep + 1);
                        setSelectedAnswer(null);
                      } else {
                        closeQuiz();
                        setSelectedAnswer(null);
                      }
                    }}
                  >
                    {quizStep === quizQuestions.length - 1
                      ? "Finish"
                      : "Next ➡️"}
                  </Button>
                </>
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  button: { margin: 2, width: 200 },
  input: {
    width: "75%",
    position: "absolute",
    marginTop: "5%",
    paddingTop: 2,
  },
  view: {
    position: "relative",
    padding: "15%",
  },
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "space-between",
    flex: 1,
  },
});
