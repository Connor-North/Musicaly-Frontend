import { Tabs } from "expo-router";
//import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { MouseEventHandler } from "react";
//import * as eva from "@eva-design/eva";
//import { ApplicationProvider } from "@ui-kitten/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
//import { Stylesheet, Views } from "react-native";

import {
  TopNavigationAction,
  Icon,
  IconElement,
  IconProps,
  OverflowMenu,
  MenuItem,
  TopNavigation,
} from "@ui-kitten/components";

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const MenuIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="more-vertical" />
  );

  const LogOutIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="log-out" />
  );

  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  const renderOverflowMenuAction = (): React.ReactElement => (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}
    >
      <MenuItem accessoryLeft={LogOutIcon} title="Logout" />
    </OverflowMenu>
  );
  return (
    // <ApplicationProvider {...eva} theme={eva.light}>
    //<SafeAreaProvider>

    <React.Fragment>
      <TopNavigation accessoryRight={renderOverflowMenuAction} />
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
        <TopNavigation accessoryRight={renderOverflowMenuAction} />
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
        <TopNavigation accessoryRight={renderOverflowMenuAction} />
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
        <TopNavigation accessoryRight={renderOverflowMenuAction} />
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
