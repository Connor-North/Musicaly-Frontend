import { Tabs } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaProvider>
        <SafeAreaView style={page.container}>
          <React.Fragment>
            <Tabs>
              <Tabs.Screen
                name="index"
                options={{
                  title: "Home",
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="home" size={24} color="black" />
                  ),
                }}
              />
              <Tabs.Screen
                name="dashboard"
                options={{
                  title: "Dashboard",
                  tabBarIcon: ({ color, size }) => (
                    <AntDesign name="dashboard" size={24} color="black" />
                  ),
                }}
              />
              <Tabs.Screen
                name="library"
                options={{
                  title: "Library",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="library-outline" size={24} color="black" />
                  ),
                }}
              />
              <Tabs.Screen
                name="new-session"
                options={{
                  title: "New Session",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="create-outline" size={24} color="black" />
                  ),
                }}
              />
            </Tabs>
          </React.Fragment>
        </SafeAreaView>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
});
