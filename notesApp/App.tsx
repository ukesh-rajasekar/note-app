import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import NotesProvider from './src/contexts/notesProvider';
import {NavigationStack} from './src/navigation-stack';
import {LIGHT_BG_COLOR} from './src/utils/colors';

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: LIGHT_BG_COLOR,
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <NotesProvider>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </NotesProvider>
    </SafeAreaView>
  );
}

export default App;
