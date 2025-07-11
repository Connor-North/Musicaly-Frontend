import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { Card } from '@ui-kitten/components';

export default function UnitCard() {
  return (
    <Card style={styles.card}>
      <Text>Oasis</Text>
      <Text>Wonderwall</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 5,
    paddingLeft: '10%',
    paddingRight: '10%',
    margin: '2%',
  },
});
