import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {BUTTON_BG_COLOR, DISABLED_BUTTON_BG_COLOR} from '../../assets/colors';

type ButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};
const CustomButton = ({onPress, title, disabled = false}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabledButton]}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: BUTTON_BG_COLOR,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: DISABLED_BUTTON_BG_COLOR,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
