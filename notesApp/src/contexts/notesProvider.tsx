import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {NoteContextType, NoteType} from '../types/note';

const NoteContext = createContext<NoteContextType>({
  notes: [],
  setNotes: () => {},
  findNotes: async () => {},
});

const NotesProvider = ({children}: {children: ReactNode}) => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      setNotes(JSON.parse(result));
    }
  };

  useEffect(() => {
    findNotes();
  }, []);

  return (
    <NoteContext.Provider value={{notes, setNotes, findNotes}}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);

export default NotesProvider;
