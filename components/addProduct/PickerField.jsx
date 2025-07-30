import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'

export default function PickerField(props) {
  let { label, selectedValue, onValueChange, options, placeholder } = props;

  options = options || [];
  if (options.length === 0) {
    options = [
      { productType: 'Seçiniz...', productTypeID: '' }
    ];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          <Picker.Item 
            label={placeholder || "Seçiniz..."} 
            value="" 
            enabled={false}
            style={{ color: '#9CA3AF' }}
          />
          {options.map((option, index) => (
            <Picker.Item 
              key={option.productTypeID || index} 
              label={option.productType} 
              value={option.productTypeID} 
            />
          ))}
        </Picker>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 16,
    color: '#000',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginBottom: 16,
    width: 320,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
