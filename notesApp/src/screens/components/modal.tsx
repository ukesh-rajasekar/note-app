import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import {BUTTON_BG_COLOR} from '../../assets/colors';
import TickIcon from '../../assets/tick-icon';

type AlertModalProps = {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
};

const AlertModal = ({isVisible, message, onClose}: AlertModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = new Animated.Value(100);

  useEffect(() => {
    setModalVisible(isVisible);
    Animated.timing(translateY, {
      toValue: isVisible ? 0 : 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onClose();
      }}>
      <View style={styles.centeredView}>
        <Animated.View
          style={[styles.modalView, {transform: [{translateY: translateY}]}]}>
          <Text style={styles.modalText}>{message}</Text>
          <TickIcon width={100} height={100} />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              setModalVisible(false);
              onClose();
            }}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '60%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: BUTTON_BG_COLOR,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AlertModal;
