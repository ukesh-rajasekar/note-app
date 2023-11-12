import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Notes from './screens/components/notes';
import MyList from './screens/my-list';
import {HEADER_TINT_COLOR} from './assets/colors';
import {NoteType} from './types/note';

export type MyNotesStackParams = {
  newNotes: {notesDetail: NoteType};
  'my notes': {};
};

export const NavigationStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="my notes"
        component={MyList}
        options={() => ({
          headerTitleStyle: {fontSize: 15},
          headerShown: true,
          headerTitle: 'my notes',
          headerTransparent: true,
          headerTintColor: HEADER_TINT_COLOR,
          headerBlurEffect: 'prominent',
        })}
      />
      <Stack.Screen
        key={'stack2'}
        name="newNotes"
        component={Notes}
        options={() => ({
          headerTitleStyle: {fontSize: 15},
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: HEADER_TINT_COLOR,
          headerBlurEffect: 'prominent',
        })}
      />
    </Stack.Navigator>
  );
};
