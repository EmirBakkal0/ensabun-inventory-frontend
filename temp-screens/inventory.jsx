import { SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Inventory() {
  // Mock inventory data
  const inventoryItems = [
    { id: 1, name: "Product A", quantity: 25, category: "Electronics" },
    { id: 2, name: "Product B", quantity: 10, category: "Clothing" },
    { id: 3, name: "Product C", quantity: 5, category: "Books" },
    { id: 4, name: "Product D", quantity: 0, category: "Electronics" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-6">
          📋 Inventory
        </Text>
        
        <ScrollView className="flex-1">
          {inventoryItems.map((item) => (
            <View 
              key={item.id} 
              className={`p-4 mb-3 rounded-lg ${
                item.quantity === 0 ? 'bg-red-100' : 'bg-white'
              }`}
            >
              <Text className="text-lg font-semibold text-gray-800">
                {item.name}
              </Text>
              <Text className="text-gray-600">Category: {item.category}</Text>
              <Text className={`font-medium ${
                item.quantity === 0 ? 'text-red-600' : 'text-green-600'
              }`}>
                Quantity: {item.quantity}
                {item.quantity === 0 && " (Out of Stock)"}
              </Text>
            </View>
          ))}
        </ScrollView>
        
        <View className="mt-4 space-y-3">
          <TouchableOpacity className="bg-blue-500 p-4 rounded-lg">
            <Text className="text-white text-center font-semibold text-lg">
              Add New Item
            </Text>
          </TouchableOpacity>
          
          <Link href="/scanner" asChild>
            <TouchableOpacity className="bg-green-500 p-4 rounded-lg">
              <Text className="text-white text-center font-semibold text-lg">
                Scan to Add
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
