import { View, Text, SafeAreaView,Pressable } from 'react-native'
import {useState} from 'react'
import { useRouter, Stack } from 'expo-router';
import InputField from 'components/addProduct/InputField';
import axios from 'axios';

export default function AddCategory() {

  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    if (!categoryName) {
      alert('Lütfen kategori adını girin');
      return;
    }
    try {
      axios.post(`http://192.168.10.171:3001/api/product-types`, { productType: categoryName })
        .then(response => {
          alert('Kategori başarıyla eklendi');
          setCategoryName('');
        })
        .catch(error => {
          alert('Kategori eklenirken bir hata oluştu');
          console.error(error);
        });
    } catch (error) {
      alert('Kategori eklenirken bir hata oluştu');
      console.error(error);
    }
  }

  return (
    <SafeAreaView className='h-5/6 justify-center items-center'>
      <Stack.Screen
        options={{
          title: `Kategori Ekle`,
          headerShown: true,
        }}
        />
      <InputField label="Kategori İsmi" value={categoryName} onChangeText={setCategoryName} placeholder="Kategorinin adını girin" />
      <Pressable onPress={handleAddCategory} className='bg-blue-500 rounded-lg p-4 '>
        <Text className='text-white text-center'>Kategoriyi Ekle</Text>
      </Pressable>
    </SafeAreaView>
  )
}

  