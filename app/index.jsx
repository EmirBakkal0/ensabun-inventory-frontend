import { SafeAreaView, Text, View, Image } from "react-native";
import {Stack, Link} from "expo-router";
import MainMenuButton from "../components/MainMenuButton";

export default function Home() {
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          title: `Ana Menü`,
          headerShown: true,
        }}
        />
      <View className="flex-1 justify-center items-center">
      <Image source={require('../assets/mainMenu.jpg')} className="w-24 h-24 rounded-xl mb-4" />
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          Ensabun Envanter Yönetimi
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-8">
          Envantere hoş geldiniz, ürünleri yönetin ve takip edin
        </Text>

        <View className="flex-row flex-wrap justify-between px-4">
          <View className="w-[48%] mb-4">
            <MainMenuButton label="📋 Envantere Gözat" href="/inventory" color="bg-purple-500" />
          </View>
          <View className="w-[48%] mb-4">
            <MainMenuButton label="📷 Ürün Tara" href="/scanner" color="bg-blue-500" />
          </View>
          <View className="w-[48%] mb-4">
            <MainMenuButton label="📦 Ürün Ekle" href="/addProduct" color="bg-green-500" />
          </View>
          <View className="w-[48%] mb-4">
            <MainMenuButton label="📦 Ürün Düzenle WIP" href="/editProduct" color="bg-yellow-500" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  
}