import { View, TextInput, StyleSheet, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, OverflowMenu, MenuItem, Input } from "@ui-kitten/components";
import React from "react";
import UnitCard from "@/components/unit-card";
import UnitList from "@/components/units/UnitList";

export default function NewSession() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [artist, setArtist] = React.useState("");

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

  const [value, setValue] = React.useState("");

  const renderMenuButton = (): React.ReactElement => (
    <Button style={styles.button} onPress={toggleMenu}>
      Create New Session
    </Button>
  );
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
        <UnitList />

        {/* <Input
          style={styles.input}
          placeholder="Place your Text"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        /> */}

        {/* <OverflowMenu
          fullWidth={true}
          onSelect={toggleMenu}
          visible={menuVisible}
          anchor={renderMenuButton}
          onBackdropPress={toggleMenu}
        >
          <MenuItem title="Repertoire" onPress={toggleModal} />
          <MenuItem title="Technical Exercises" onPress={toggleModal} />
        </OverflowMenu> */}

        {/* TODO - Move menu options into modal */}

        {/* Create new card list with header to 'practice new piece' */}
        <UnitCard />
        <UnitCard />

        <Modal
          visible={modalVisible}
          //animationType="slide"
          //presentationStyle="pageSheet"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={styles.mainView}
            className="flex-1 items-center justify-center"
          >
            <View style={styles.view} className="p-12 rounded-lg bg-white">
              <TextInput
                placeholder={"title"}
                onChangeText={(text) => setTitle(text)}
                value={title}
              />
              <TextInput
                placeholder={"artist"}
                onChangeText={(text) => setArtist(text)}
                value={artist}
              />
              <Button onPress={() => setModalVisible(false)}>Create</Button>
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
