import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import category from '../../assets/category.json';
import client from '../../assets/client.json';
import {useNotes} from '../../contexts/notesProvider';
import {NoteType} from '../../types/note';
import {BORDER_COLOR, HEADER_TINT_COLOR} from '../../assets/colors';
import CustomButton from './button-ui';
import AlertModal from './modal';
import Selector from './selector';

type NotesProps = {
  route: {
    params: {
      notesDetail: NoteType;
    };
  };
};
const Notes = (props: NotesProps) => {
  const {notesDetail} = props.route.params;
  const [noteText, setNoteText] = useState<string>(notesDetail.text);

  const {notes, setNotes} = useNotes();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    notesDetail.category,
  );
  const [selectedClient, setselectedClient] = useState<string>(
    notesDetail.client,
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const isCreateButtonDisabled =
    !noteText.trim() ||
    selectedClient === 'Select a client' ||
    selectedCategory === 'Select a category';

  const isUpdateButtonDisabled =
    !noteText.trim() ||
    (notesDetail.client === selectedClient &&
      notesDetail.category === selectedCategory &&
      notesDetail.text === noteText);

  const saveNote = async () => {
    if (isCreateButtonDisabled) {
      setAlertMessage(
        "Notes, Client, or Category fields can't be empty for creating a note",
      );
      toggleModal();
      return;
    }
    // Save the new note to AsyncStorage
    const newNotes = [
      ...notes,
      {
        id: Date.now().toString(),
        text: noteText,
        category: selectedCategory,
        client: selectedClient,
      },
    ];
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setNotes(newNotes);
    setAlertMessage('Created Successfully');
    toggleModal();
  };

  const handleUpdate = async () => {
    if (isUpdateButtonDisabled) {
      return;
    }
    const newNotes = notes.filter(n => {
      if (n.id === notesDetail.id) {
        n.text = noteText;
        n.client = selectedClient;
        n.category = selectedCategory;
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setAlertMessage('Updated Successfully');
    toggleModal();
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
  };

  const handleClientChange = (val: string) => {
    setselectedClient(val);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.notesWrapper}>
        <Selector
          selected={selectedCategory}
          onChange={handleCategoryChange}
          options={category}
          defaultLabel={'Select a category'}
        />
        <Selector
          selected={selectedClient}
          onChange={handleClientChange}
          options={client}
          defaultLabel={'Select a client'}
        />
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="start taking notes..."
          value={noteText}
          onChangeText={text => setNoteText(text)}
          style={{
            ...styles.textInputStyle,
            borderColor: isFocus ? HEADER_TINT_COLOR : BORDER_COLOR,
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
        />
        <CustomButton
          disabled={isCreateButtonDisabled || isUpdateButtonDisabled}
          title={notesDetail.id === 'new' ? 'create' : 'update'}
          onPress={notesDetail.id === 'new' ? saveNote : handleUpdate}
        />
      </View>
      <AlertModal
        isVisible={isModalVisible}
        message={alertMessage}
        onClose={toggleModal}
      />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  textInputStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    minHeight: 100,
    paddingLeft: 5,
    marginTop: 10,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  notesWrapper: {
    width: '80%',
  },
});
