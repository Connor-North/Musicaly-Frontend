import { Text, View, TextInput, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, OverflowMenu, MenuItem, Input } from '@ui-kitten/components';
import React from 'react';
// const HeartIcon = (props): IconElement => <Icon {...props} name="heart" />;
export default function NewSession() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [artist, setArtist] = React.useState('');

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

  const [value, setValue] = React.useState('');

  const renderMenuButton = (): React.ReactElement => (
    <Button
      style={styles.button}
      //accessoryLeft={HeartIcon}
      onPress={toggleMenu}
    >
      Create New Session
    </Button>
  );
  return (
    <SafeAreaView
      className="justify-center flex-1 p-4"
      style={styles.container}
    >
      <Input
        style={styles.input}
        placeholder="Place your Text"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
      <OverflowMenu
        fullWidth={true}
        onSelect={toggleMenu}
        visible={menuVisible}
        anchor={renderMenuButton}
        onBackdropPress={toggleMenu}
      >
        <MenuItem title="Repertoire" onPress={toggleModal} />
        <MenuItem title="Technical Exercises" onPress={toggleModal} />
      </OverflowMenu>

      <Modal
        visible={modalVisible}
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
              placeholder={'title'}
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <TextInput
              placeholder={'artist'}
              onChangeText={(text) => setArtist(text)}
              value={artist}
            />
            <Button onPress={() => setModalVisible(false)}>Create</Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  button: { margin: 2, marginTop: '30%' },
  input: {
    width: '75%',
    position: 'absolute',
    marginTop: '5%',
  },
  view: {
    position: 'relative',
    padding: '15%',
  },
  mainView: {
    justifyContent: 'center',
    flex: 1,
  },
});
