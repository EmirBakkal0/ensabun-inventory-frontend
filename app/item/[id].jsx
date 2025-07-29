import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';


const fakeData = {
  "1" : {productName:"Çayağacı Biberiye", stock: 395, cost: 280, price: 350, description: "Çayağacı Biberiyesi, doğal bir bitkisel üründür.", image: "https://picsum.photos/300"},
} 



export default function Item() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView className='flex-1 bg-gray-100 p-4'>
      <View className='flex-1 justify-center items-center'>
        <Text className='font-bold  text-lg'>
          Ürün: {fakeData[id]?.productName || "Unknown Product"}
        </Text>
        <Text>Ürün ID: {id}</Text>
        <Text>
          Stock: {fakeData[id]?.stock || 0}
        </Text>
        <Text>
          Cost: {fakeData[id]?.cost || 0}
        </Text>
        <Text>
          Price: {fakeData[id]?.price || 0}
        </Text>
        <Text>
          Description: {fakeData[id]?.description || "No description available."}
        </Text> 
        <View className='flex-direction-column justify-center items-center mt-4'>
          <Pressable className='bg-green-500 p-2 rounded-lg mt-4 mb-2'>
            <Text className='text-white'>
              Cost Belirle
            </Text>
          </Pressable>
          <Pressable className='bg-red-500 p-2 rounded-lg mt-4 mb-2'>
            <Text className='text-white'>
            Fiyat Belirle
            </Text>
          </Pressable>
          <Pressable className='bg-blue-500 p-2 rounded-lg mt-4 mb-2'>
            <Text className='text-white'>
              Satış yap
            </Text>
          </Pressable>
          

        </View>

      </View>
    </SafeAreaView>
  )
}