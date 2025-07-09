import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Layout, Spinner } from '@ui-kitten/components';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/music.jpg')}
        style={styles.image}
      ></Image>

      <Layout style={styles.containerOne} level="1">
        <Spinner size="tiny" />
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
        <Spinner size="giant" />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  image: { width: '100%', height: '50%' },
  containerOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
