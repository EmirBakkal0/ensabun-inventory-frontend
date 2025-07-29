import { Camera, CameraView } from "expo-camera";
import { Stack,router,useRouter } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

// import { Overlay } from "./Overlay";
import { useEffect, useRef } from "react";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  const router = useRouter();

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          router.push(`/item/${data}`);
          qrLock.current = true;  
        }}
      />
      {/* <Overlay /> */}
    </SafeAreaView>
  );
}