import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React from 'react'
import { Link,Stack } from "expo-router";

export default function ManualEntry() {

    const [productId, setProductId] = React.useState('');
  return (
    <SafeAreaView className='flex-1 bg-gray-100 p-4'>
        <Stack.Screen
        options={{
          title: `Elle giriş`,
          headerShown: true,
        }} />
      <View className='flex-1 justify-center items-center'>
        <Text className='font-bold text-lg text-center'>
          Elle giriş yapmak istediğiniz ürünün ID&#39;sini girin
        </Text>
        <TextInput placeholder='Enter Product ID' 
        style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 20 }}
        value={productId}
        keyboardType='numeric'
        onChangeText={setProductId}
        />
        <Link href={`/item/${productId}`} asChild>
          <Text className='m-4 p-4 bg-green-500 rounded-lg'>Ürüne git</Text>
        </Link>
      </View>
    </SafeAreaView>
  ) 
}