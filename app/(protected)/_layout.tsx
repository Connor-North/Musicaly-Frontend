import { Tabs } from "expo-router";
//import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
//import * as eva from "@eva-design/eva";
//import { ApplicationProvider } from "@ui-kitten/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stylesheet, Views } from "react-native";

import { TopNavigationAction, Icon, IconElement } from "@ui-kitten/components";

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const MenuIcon = (props: { name: "string" }): IconElement => (
    <Icon {...props} name="more-vertical" />
  );

  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  return (
    // <ApplicationProvider {...eva} theme={eva.light}>
    //<SafeAreaProvider>

    <React.Fragment>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="dashboard" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarLabel: "Library",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library-outline" size={24} color="black" />
            ),
          }}
        />
        <Tabs.Screen
          name="new-session"
          options={{
            title: "New Session",
            tabBarLabel: "New Session",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create-outline" size={24} color="black" />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>

    // </SafeAreaProvider>
    //</ApplicationProvider>
  );
}
