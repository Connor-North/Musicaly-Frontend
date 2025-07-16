import { handleSignOut } from "./../supabase/supabase-signout";
import React from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, Button } from "@ui-kitten/components";
import MusicalyLogo from "./MusicalyLogo";

export default function CustomHeader() {
  const [disableSignOutButton, setDisableSignOutButton] = React.useState(false);

  async function signOut() {
    setDisableSignOutButton(true);
    await handleSignOut();
    setDisableSignOutButton(false);
  }

  const renderSignOut = (): React.ReactElement => (
    <>
      <Button onPress={signOut} size="tiny">
        Logout
      </Button>
    </>
  );

  return (
    <TopNavigation
      accessoryRight={renderSignOut}
      alignment="center"
      title="Musicaly"
      accessoryLeft={() => <MusicalyLogo />}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 20,
  },
});
