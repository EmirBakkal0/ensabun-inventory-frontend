import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Product from '../../components/product';

// This page displays the details of a specific product based on the ID passed in the URL
// It uses the Product component to fetch and display product information

export default function Item() {
  const { id } = useLocalSearchParams();
  const router = useRouter();


  return (
    <SafeAreaView className='flex-1 bg-gray-100 p-4'>
      <Stack.Screen
        options={{
          title: `Ürün ID:${id}`,
          headerShown: true,
        }}
      />
      <View className='flex-1 justify-center items-center'>
        <Product id={id} />
        <View className='flex-direction-column justify-center items-center mt-4'>
          <Pressable onPress={() => router.push(`/item/${id}/setCost`)} className='bg-green-500 p-2 rounded-lg mt-4 mb-2'>
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