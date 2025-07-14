import { handleSignOut } from "./../supabase/supabase-signout";
import React from "react";
import {
  TopNavigationAction,
  Icon,
  IconElement,
  IconProps,
  OverflowMenu,
  MenuItem,
  TopNavigation,
} from "@ui-kitten/components";
export default function CustomHeader() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [disableSignOutButton, setDisableSignOutButton] = React.useState(false);
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  async function signOut() {
    setDisableSignOutButton(true);
    await handleSignOut();
    setDisableSignOutButton(false);
  }
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
      placement="bottom end"
      onBackdropPress={toggleMenu}
    >
      <MenuItem accessoryLeft={LogOutIcon} title="Logout" onPress={signOut} />
    </OverflowMenu>
  );
  return <TopNavigation accessoryRight={renderOverflowMenuAction} />;
}
