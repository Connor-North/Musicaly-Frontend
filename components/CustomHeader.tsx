import { handleSignOut } from "./../supabase/supabase-signout";
import React from "react";

import { TopNavigation, Button } from "@ui-kitten/components";
export default function CustomHeader() {
  const [disableSignOutButton, setDisableSignOutButton] = React.useState(false);

  async function signOut() {
    setDisableSignOutButton(true);
    await handleSignOut();
    setDisableSignOutButton(false);
  }

  const renderSignOut = (): React.ReactElement => (
    <Button onPress={signOut}>Logout</Button>
  );

  return <TopNavigation accessoryRight={renderSignOut} />;
}
