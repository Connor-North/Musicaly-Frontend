import { View, StyleSheet, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, Input, Radio, RadioGroup } from "@ui-kitten/components";
import React from "react";
import UnitCard from "@/components/unit-card";
import UnitList from "@/components/units/UnitList";
import PSU from "@/components/sessions/PSU";

export default function NewSession() {
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
        <Button style={styles.button} onPress={toggleModal}>
          Create New Session
        </Button>
        <UnitList
          buttonText="Start"
          onButtonPress={(item) => {
            console.log("You clicked:", item.title);
          }}
        />

        <UnitCard />
        <UnitCard />

        <Modal
          visible={modalVisible}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={styles.mainView}
            className="flex-1 items-center justify-center"
          >
            <View style={styles.view} className="p-12 rounded-lg bg-white">
              <Input
                placeholder={"Title"}
                onChangeText={(text) => setTitle(text)}
                value={title}
              />
              <Input
                placeholder={"Artist"}
                onChangeText={(text) => setArtist(text)}
                value={artist}
              />
              <RadioGroup
                selectedIndex={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
              >
                <Radio>Repertoire</Radio>
                <Radio>Technical Exercises</Radio>
              </RadioGroup>
              {title.length < 2 || artist.length < 2 ? (
                <Text>Please enter more information</Text>
              ) : (
                <Button onPress={() => setModalVisible(false)}>Create</Button>
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
  button: { margin: 2, marginTop: "10%", marginBottom: "5%" },
  input: {
    width: "75%",
    position: "absolute",
    marginTop: "5%",
  },
  view: {
    position: "relative",
    padding: "15%",
  },
  mainView: {
    justifyContent: "center",
    flex: 1,
  },
});
