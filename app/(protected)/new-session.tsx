import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Button, OverflowMenu, MenuItem } from "@ui-kitten/components";
import React from "react";
// const HeartIcon = (props): IconElement => <Icon {...props} name="heart" />;
export default function NewSession() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuButton = (): React.ReactElement => (
    <Button
      style={styles.button}
      //accessoryLeft={HeartIcon}
      onPress={toggleMenu}
    >
      PRESS ME
    </Button>
  );
  return (
    <SafeAreaView
      className="justify-center flex-1 p-4"
      style={styles.container}
    >
      <OverflowMenu
        fullWidth={true}
        onSelect={toggleMenu}
        visible={menuVisible}
        anchor={renderMenuButton}
        onBackdropPress={toggleMenu}
      >
        <MenuItem title="Repertoire" />
        <MenuItem title="Technical Exercises" />
      </OverflowMenu>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  button: { margin: 2 },
});
