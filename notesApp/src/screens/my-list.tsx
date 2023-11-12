import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeleteIcon from '../assets/delete-icon';
import EditIcon from '../assets/edit-icon';
import {useNotes} from '../contexts/notesProvider';
import {NoteType} from '../types/note';
import {BUTTON_BG_COLOR, DARK_BG_COLOR, TEXT_COLOR} from '../assets/colors';
import {MyNotesStackParams} from '../navigation-stack';
import AlertModal from './components/modal';

const Item = ({
  item,
  deleteNote,
  goToList,
}: {
  item: NoteType;
  deleteNote: (id: string) => void;
  goToList: () => void;
}) => (
  <TouchableOpacity style={styles.item} onPress={goToList}>
    <View style={styles.itemTextWrapper}>
      <Text style={styles.title}>{item.text}</Text>
      <View style={styles.tagsWrapper}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.category}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.client}</Text>
        </View>
      </View>
    </View>
    <View style={styles.iconWrapper}>
      <EditIcon />
      <TouchableOpacity onPress={() => deleteNote(item.id)}>
        <DeleteIcon />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const MyList = () => {
  const {notes, setNotes} = useNotes();

  const message = 'Create your notes here!';
  const instruction = 'Tap the plus button to create your first note';
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<MyNotesStackParams>>();

  const onAdd = () => {
    //navigate to creation page
    navigation.navigate('newNotes', {
      notesDetail: {
        id: 'new',
        text: '',
        category: 'Select a category',
        client: 'Select a client',
      },
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const deleteNote = async (id: string) => {
    // Delete a note from AsyncStorage
    const updatedNotes = notes.filter(note => note.id !== id);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setModalVisible(true);
  };

  return (
    <View style={styles.myListContainer}>
      {isModalVisible ? (
        <AlertModal
          isVisible={isModalVisible}
          message={'Deleted Successfully!'}
          onClose={toggleModal}
        />
      ) : (
        <>
          {notes.length === 0 ? (
            <View style={styles.myNotesMsgWrapper}>
              <Text style={styles.Message}>{message}</Text>
              <Text style={styles.Message}>{instruction}</Text>
            </View>
          ) : (
            <View style={styles.flatListWrapper}>
              <FlatList
                data={notes}
                renderItem={({item}) => (
                  <Item
                    item={item}
                    deleteNote={deleteNote}
                    goToList={() => {
                      navigation.navigate('newNotes', {
                        notesDetail: item,
                      });
                    }}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.addNotesWrapper}>
            <TouchableOpacity onPress={onAdd} style={styles.addNotesButton}>
              <Text style={styles.addNotesButtonText}>+ New List</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      )}
    </View>
  );
};

export default MyList;

const styles = StyleSheet.create({
  myListContainer: {
    justifyContent: 'space-evenly',
    flex: 1,
  },
  myNotesMsgWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100%',
    paddingBottom: 30,
  },
  Message: {
    paddingBottom: 5,
    fontSize: 20,
    lineHeight: 28,
    color: TEXT_COLOR,
  },
  addNotesWrapper: {
    position: 'absolute',
    bottom: '15%',
    right: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  addNotesButton: {
    backgroundColor: BUTTON_BG_COLOR,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    elevation: 10,
  },
  addNotesButtonText: {
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  flatListWrapper: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  item: {
    margin: '4%',
    paddingVertical: 10,
    paddingHorizontal: '4%', // Use percentage-based padding
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: DARK_BG_COLOR,
    borderRadius: 4,
  },
  title: {
    marginBottom: '2%',
    marginLeft: '2%',
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tagsWrapper: {
    flexDirection: 'row',
    marginTop: '1%',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    paddingVertical: '1.5%',
    paddingHorizontal: '2%',
    borderRadius: 10,
    marginRight: '2%',
  },
  tagText: {
    color: '#333',
  },
  itemTextWrapper: {
    flex: 4,
    padding: '2%', // Use percentage-based padding
  },
});
