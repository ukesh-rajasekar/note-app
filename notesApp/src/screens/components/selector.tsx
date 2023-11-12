import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {PickerOptions} from '../../types/note';

type SelectorProps = {
  options: PickerOptions[];
  selected: string;
  onChange: (value: string) => void;
  defaultLabel: string;
};

const Selector = ({
  options,
  selected,
  onChange,
  defaultLabel,
}: SelectorProps) => {
  return (
    <View style={styles.conatainer}>
      <RNPickerSelect
        fixAndroidTouchableBug
        value={selected}
        onValueChange={value => onChange(value)}
        items={options}
        placeholder={{label: defaultLabel, value: null}}
      />
    </View>
  );
};

export default Selector;

const styles = StyleSheet.create({
  conatainer: {
    paddingVertical: 20,
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 5,
    marginVertical: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
