import { View, Text, SafeAreaView, Image, Pressable, ScrollView,Modal, Alert , StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Product from '../../components/product';
import axios from 'axios';

// This page displays the details of a specific product based on the ID passed in the URL
// It uses the Product component to fetch and display product information

export default function Item() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleDeleteProduct = () => {
    axios.delete(`http://192.168.10.171:3001/api/products/${id}`)
      .then(response => {
        console.log('Product deleted successfully:', response.data);
        Alert.alert('Ürün silindi.');
        router.push('/'); // Redirect to the home page or product list after deletion
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        Alert.alert('Ürün silinirken bir hata oluştu.');
      });
  }

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
       <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Silmek istediğinizden emin misiniz?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleDeleteProduct();
                  setModalVisible(!modalVisible);
                  router.back(); // Go back to the previous screen after deletion
                }}>
                <Text style={styles.textStyle}>Evet</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hayır</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      
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

            <Pressable className="bg-violet-500 rounded-xl p-4 shadow-sm mb-3">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">📦</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Update Stock</Text>
                  <Text className="text-white text-xs opacity-80">Manage inventory</Text>
                </View>
              </View>
            </Pressable>
            <Pressable className="bg-red-500 rounded-xl p-4 shadow-sm" onPress={() => setModalVisible(true)}>
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">🗑️</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Ürünü sil</Text>
                  <Text className="text-white text-xs opacity-80">Ürünü database&apos;den sil</Text>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark semi-transparent background
  },
  modalView: {
    
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 19,
    marginBottom: 15,
    textAlign: 'center',

  },
});
