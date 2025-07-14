import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Modal, View, Text } from 'react-native';
import UnitList from '@/components/units/UnitList';
import React from 'react';
import UnitCard from '@/components/unit-card';

export default function Library() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const toggleModal = (): void => {
    setModalVisible(!modalVisible);
  };

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
          <UnitCard />
          <Text>Total Time played: 3 Hours </Text>
          <Text>First played: (dskjcvds) </Text>
          <Text>Last played: (dskjcvds) </Text>
          <Text> Moonlight Sonata</Text>
          <Text>Comments:</Text>
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
});
