import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Modal, View, Text, TextInput } from 'react-native';
import UnitList from '@/components/units/UnitList';
import React from 'react';
import UnitCard from '@/components/unit-card';
import { Input } from '@ui-kitten/components';

export default function Library() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };
  const [note, setNote] = React.useState<string>('');

  return (
    <SafeAreaView
      className="justify-center flex-1 p-4"
      style={styles.container}
    >
      <UnitList buttonText="Edit" onButtonPress={toggleModal} />
      return(
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
          <UnitCard artist="Beethoven" title="Moonlight Sonata" />
          <Text>Total Time played: 3 Hours </Text>
          <Text>First played: 25 January 2025 </Text>
          <Text>Last played: 30 January 2025 </Text>
          <View>
            <Text>Comments:</Text>
            <Input
              multiline={true}
              textStyle={styles.inputTextStyle}
              placeholder="Add Notes"
              value={note}
              onChangeText={(value) => setNote(value)}
              style={{ width: '80%' }}
            />
          </View>
        </View>
      </Modal>
      )
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  mainView: {
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 10,
    borderWidth: 3,
  },
  inputTextStyle: {
    minHeight: 100,
  },
});
