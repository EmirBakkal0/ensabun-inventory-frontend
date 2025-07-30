import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function InputField(props) {
  const { label, value, onChangeText, placeholder, keyboardType } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: 320,
    backgroundColor: '#fff',
  },
});
