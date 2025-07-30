import "../global.css";
import { Tabs,Stack} from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack></Stack>
     
    </SafeAreaProvider>
  );
}