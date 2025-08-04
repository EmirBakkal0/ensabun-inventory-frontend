import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(true);

  // Reset camera and scanner when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      qrLock.current = false; // Reset the QR lock when returning to screen
      
      return () => {
        setIsFocused(false); // Disable camera when leaving screen
      };
    }, [])
  );



  
  const handleProductNavigation = (data) => {
    if (!data.trim()) {
      alert('Lütfen bir ürün ID\'si girin.');
      return;
    }

    console.log('hey im navigating to product with ID:', data);

    axios.get(`http://192.168.10.171:3001/api/products/${data}`)
      .then((response) => {
        if (response.data && response.data.data) {
          // Product exists, navigate to the product page
          router.push(`/item/${data}`);
        } else {
          // Handle case where product does not exist
          // console.error('Product not found');
          alert('Ürün bulunamadı. Lütfen geçerli bir QR okutun.'); /// it keeps repeating the alert here do something about it
          qrLock.current = false; // Reset lock to allow scanning again
          // router.push('/scanner');
        }
      })
      .catch((error) => {
        // console.error('Error fetching product:', error);
        alert('Ürün bulunamadı. Lütfen geçerli bir QR kodu okutun.');
        qrLock.current = false; // Reset lock to allow scanning again
      });
  };




  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "QR kodu okut",
          headerShown: true,
        }}
      />
      {/* {Platform.OS === "android" ? <StatusBar hidden /> : null} */}
      {isFocused && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(async () => {
                await handleProductNavigation(data);
              }, 100);
            }
          }}
        />
      )}
      
    </SafeAreaView>
  );
}