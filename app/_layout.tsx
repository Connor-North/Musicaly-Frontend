import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaProvider>
        <React.Fragment>
          <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="dashboard" />
            <Tabs.Screen name="library" />
            <Tabs.Screen name="new-session" />
          </Tabs>
        </React.Fragment>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}
