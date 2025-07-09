import { StyleSheet, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Layout, Spinner } from "@ui-kitten/components";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    ></SafeAreaView>
  );
}
