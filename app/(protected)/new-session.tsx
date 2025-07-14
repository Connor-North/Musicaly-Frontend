import { View, StyleSheet, Modal, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Input, Radio, RadioGroup } from "@ui-kitten/components";
import React from "react";
import UnitCard from "@/components/unit-card";
import UnitList from "@/components/units/UnitList";
import { useRouter } from "expo-router";

export default function NewSession() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [artist, setArtist] = React.useState("");

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
          buttonText="Start"
          onButtonPress={(item) => {
            console.log("You clicked:", item.title, item.id);
            router.push({
              pathname: "/screens/sessions/PracticeSession",
              params: {
                title: item.title,
                id: item.id,
                composer: item.composer,
              },
            });
          }}
        />

        <Button style={styles.button} onPress={toggleModal}>
          Add New Piece
        </Button>
        <UnitCard />

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
                    router.push({
                      pathname: "/screens/sessions/PracticeSession",
                      params: {
                        title: title,
                        composer: artist,
                      },
                    });
                  }}
                >
                  Let's practice!
                </Button>
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
  button: { margin: 2 },
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
