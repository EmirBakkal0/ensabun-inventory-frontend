import { View, Text, SafeAreaView, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Product from '../../components/product';

// This page displays the details of a specific product based on the ID passed in the URL
// It uses the Product component to fetch and display product information

export default function Item() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Stack.Screen
        options={{
          title: `Ürün Detayları`,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-blue-600 px-5 pb-5 pt-2 rounded-b-3xl">
          <View className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full self-start">
            <Text className="text-black text-sm font-semibold">ID: {id}</Text>
          </View>
        </View>

        {/* Product Information Card */}
        <View className="bg-white mx-5 -mt-2 rounded-2xl p-5 shadow-lg">
          <Product id={id} />
        </View>

        {/* Action Buttons Section */}
        <View className="mx-5 mt-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Product Actions</Text>
          
          <View>
            <Pressable 
              onPress={() => router.push(`/item/${id}/setCost`)} 
              className="bg-emerald-500 rounded-xl p-4 shadow-sm mb-3"
            >
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">💰</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Set Cost</Text>
                  <Text className="text-white text-xs opacity-80">Update product cost</Text>
                </View>
              </View>
            </Pressable>

            <Pressable className="bg-amber-500 rounded-xl p-4 shadow-sm mb-3">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">🏷️</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Set Price</Text>
                  <Text className="text-white text-xs opacity-80">Update sale price</Text>
                </View>
              </View>
            </Pressable>

            <Pressable className="bg-blue-500 rounded-xl p-4 shadow-sm mb-3">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">🛒</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Make Sale</Text>
                  <Text className="text-white text-xs opacity-80">Process transaction</Text>
                </View>
              </View>
            </Pressable>

            <Pressable className="bg-violet-500 rounded-xl p-4 shadow-sm">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">📦</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Update Stock</Text>
                  <Text className="text-white text-xs opacity-80">Manage inventory</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View className="mx-5 mt-8 mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <Pressable className="bg-white flex-1 mx-1 p-4 rounded-xl items-center shadow-sm">
              <Text className="text-xl mb-2">📊</Text>
              <Text className="text-xs font-medium text-gray-600 text-center">View Analytics</Text>
            </Pressable>
            
            <Pressable className="bg-white flex-1 mx-1 p-4 rounded-xl items-center shadow-sm">
              <Text className="text-xl mb-2">📝</Text>
              <Text className="text-xs font-medium text-gray-600 text-center">Edit Details</Text>
            </Pressable>
            
            <Pressable className="bg-white flex-1 mx-1 p-4 rounded-xl items-center shadow-sm">
              <Text className="text-xl mb-2">🔄</Text>
              <Text className="text-xs font-medium text-gray-600 text-center">Reorder</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}