import { SafeAreaView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";

export default function Scanner() {

  const [permissions, requestPermissions] = useCameraPermissions();
  const hasPermission = permissions?.granted;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Stack.Screen
              options={{
                title: `Ürün okut`,
                headerShown: true,
              }}
      />
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-3xl font-bold text-gray-800 mb-4">
          📷 Scanner
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-8">
          Scan barcodes or QR codes to manage inventory
        </Text>
        
        <View className="w-full space-y-4">
          <Link href={"/scanner/scanQR"} asChild>
                <Pressable disabled={!hasPermission} className="p-4 bg-blue-500 rounded-lg mb-4">
                    <Text style={{ color: hasPermission ? 'white' : 'gray' }} className="text-center font-semibold text-lg">
                        Scan Codes
                    </Text> 
                </Pressable>
            </Link>
          <Link href="/scanner/manualEntry" asChild>
            <TouchableOpacity className="bg-green-500 p-4 rounded-lg mb-4">
              <Text className="text-white text-center font-semibold text-lg">
                Manual Entry
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/" asChild>
            <TouchableOpacity className="bg-gray-500 p-4 rounded-lg mb-4">
              <Text className="text-white text-center font-semibold text-lg">
                Back to Home
              </Text>
            </TouchableOpacity>
          </Link>
            <Pressable disabled={hasPermission} style={{ opacity: hasPermission ? 0.5 : 1 }} className="p-4 bg-blue-500 rounded-lg mb-4" onPress={() => requestPermissions()}>
                <Text className="text-white text-center font-semibold text-lg">
                    Request Camera Permissions
                </Text>
            </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}