import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Card } from "@ui-kitten/components";

type UnitCardProps = {
  artist: string;
  title: string;
};

export default function UnitCard({ artist, title }: UnitCardProps) {
  return (
    <Card style={styles.card}>
      <Text>{artist}</Text>
      <Text>{title}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 5,
    paddingLeft: "10%",
    paddingRight: "10%",
    margin: "2%",
  },
});
