import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { Link,Stack } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen
        options={{
          title: `Home`,
          headerShown: true,
        }}
        />
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          Ensabun Inventory
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-8">
          Welcome to your inventory management system
        </Text>
        
        <View className="w-full">
          <Link href="/scanner" asChild>
            <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mb-4">
              <Text className="text-white text-center font-semibold text-lg">
                📷 Scan Items
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/addProduct" asChild>
            <TouchableOpacity className="bg-red-500 p-4 rounded-lg mb-4">
              <Text className="text-white text-center font-semibold text-lg">
                📦 Ürün Ekle
              </Text>
            </TouchableOpacity>
          </Link><Link href="/editProduct" asChild>
            <TouchableOpacity className="bg-yellow-500 p-4 rounded-lg mb-4">
              <Text className="text-white text-center font-semibold text-lg">
                📦 Ürün Düzenle
              </Text>
            </TouchableOpacity>
          </Link>
          
          
          <Link href="/inventory" asChild>
            <TouchableOpacity className="bg-green-500 p-4 rounded-lg mb-4">
              <Text className="text-white text-center font-semibold text-lg">
                📋 View Inventory
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/profile" asChild>
            <TouchableOpacity className="bg-purple-500 p-4 rounded-lg">
              <Text className="text-white text-center font-semibold text-lg">
                👤 Profile Settings
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}