import { SafeAreaView, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-6">
          👤 Profile
        </Text>
        
        <ScrollView className="flex-1">
          {/* User Info Section */}
          <View className="bg-white p-4 rounded-lg mb-4">
            <Text className="text-xl font-semibold text-gray-800 mb-2">
              User Information
            </Text>
            <Text className="text-gray-600">Name: John Doe</Text>
            <Text className="text-gray-600">Role: Inventory Manager</Text>
            <Text className="text-gray-600">Department: Warehouse</Text>
          </View>
          
          {/* Settings Section */}
          <View className="bg-white p-4 rounded-lg mb-4">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Settings
            </Text>
            
            <TouchableOpacity className="py-3 border-b border-gray-200">
              <Text className="text-gray-700 text-lg">Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="py-3 border-b border-gray-200">
              <Text className="text-gray-700 text-lg">Scanner Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="py-3 border-b border-gray-200">
              <Text className="text-gray-700 text-lg">Export Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="py-3">
              <Text className="text-gray-700 text-lg">About</Text>
            </TouchableOpacity>
          </View>
          
          {/* Quick Actions */}
          <View className="bg-white p-4 rounded-lg mb-4">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </Text>
            
            <Link href="/inventory" asChild>
              <TouchableOpacity className="bg-blue-500 p-3 rounded-lg mb-3">
                <Text className="text-white text-center font-semibold">
                  View All Items
                </Text>
              </TouchableOpacity>
            </Link>
            
            <Link href="/scanner" asChild>
              <TouchableOpacity className="bg-green-500 p-3 rounded-lg mb-3">
                <Text className="text-white text-center font-semibold">
                  Quick Scan
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
        
        <TouchableOpacity className="bg-red-500 p-4 rounded-lg mt-4">
          <Text className="text-white text-center font-semibold text-lg">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
