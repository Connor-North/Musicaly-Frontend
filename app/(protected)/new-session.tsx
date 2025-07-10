import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { Button, OverflowMenu, MenuItem, Input } from '@ui-kitten/components';
import React from 'react';
// const HeartIcon = (props): IconElement => <Icon {...props} name="heart" />;
export default function NewSession() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const [value, setValue] = React.useState('');

  const renderMenuButton = (): React.ReactElement => (
    <Button
      style={styles.button}
      //accessoryLeft={HeartIcon}
      onPress={toggleMenu}
    >
      Create New Session
    </Button>
  );
  return (
    <SafeAreaView
      className="justify-center flex-1 p-4"
      style={styles.container}
    >
      <Input
        style={styles.input}
        placeholder="Place your Text"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
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
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  button: { margin: 2, marginTop: '30%' },
  input: {
    width: '75%',
    position: 'absolute',
    marginTop: '5%',
  },
});
