import { View, Text, SafeAreaView, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Link, Stack, useRouter } from 'expo-router';
import axios from 'axios';

export default function ManualEntry() {
  const [productId, setProductId] = React.useState('');
  const router = useRouter();

  const handleProductNavigation = () => {
    if (!productId.trim()) {
      alert('Lütfen bir ürün ID\'si girin.');
      return;
    }

    console.log('hey im navigating to product with ID:', productId);

    axios.get(`http://192.168.10.171:3001/api/products/${productId}`)
      .then((response) => {
        if (response.data && response.data.data) {
          // Product exists, navigate to the product page
          router.push(`/item/${productId}`);
        } else {
          // Handle case where product does not exist
          console.error('Product not found');
          alert('Ürün bulunamadı. Lütfen geçerli bir ID girin.');
        }
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
        alert('Ürün bulunamadı. Lütfen geçerli bir ID girin.');
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <Stack.Screen
        options={{
          title: `Elle giriş`,
          headerShown: true,
        }}
      />
      <View className="flex-1 items-center justify-center">
        <Text className="text-center text-lg font-bold">
          Elle giriş yapmak istediğiniz ürünün ID&#39;sini girin
        </Text>
        <TextInput
          placeholder="Enter Product ID"
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          value={productId}
          keyboardType="numeric"
          onChangeText={setProductId}
        />
        <Pressable
          onPress={handleProductNavigation}
          className="mt-6 bg-green-500 px-6 py-3 rounded-lg shadow-sm">
          <Text className="text-white text-center text-lg font-semibold">Ürüne git</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
