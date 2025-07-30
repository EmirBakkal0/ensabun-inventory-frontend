import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'

export default function CustomDropdown(props) {
  let { label, selectedValue, onValueChange, options, placeholder } = props;
  const [isVisible, setIsVisible] = useState(false);
  
  options = options || [];
  if (options.length === 0) {
    options = [
      { productType: 'Seçiniz...', productTypeID: '' }
    ];
  }

  const selectedOption = options.find(option => option.productTypeID === selectedValue);
  
  const handleSelect = (value) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <View className='justify-center items-center'>
      <Text className="text-xl font-bold p-4">{label}</Text>
      
      <TouchableOpacity 
        className='border border-gray-900 p-4 rounded-lg mb-4 w-80 flex-row justify-between items-center'
        onPress={() => setIsVisible(true)}
      >
        <Text className={selectedValue ? 'text-black' : 'text-gray-400'}>
          {selectedOption ? selectedOption.productType : (placeholder || "Seçiniz...")}
        </Text>
        <Text className='text-gray-600'>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          className='flex-1 justify-center items-center bg-black bg-opacity-50'
          onPress={() => setIsVisible(false)}
        >
          <View className='bg-white rounded-lg p-4 w-80 max-h-60'>
            <Text className='text-lg font-bold mb-4 text-center'>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.productTypeID.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className='p-3 border-b border-gray-200'
                  onPress={() => handleSelect(item.productTypeID)}
                >
                  <Text className='text-base'>{item.productType}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              className='mt-4 p-3 bg-gray-500 rounded-lg'
              onPress={() => setIsVisible(false)}
            >
              <Text className='text-white text-center'>İptal</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
