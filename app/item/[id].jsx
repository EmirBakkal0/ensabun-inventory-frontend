import { View, Text, SafeAreaView, Image, Pressable, ScrollView,Modal, Alert , StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import Product from '../../components/product';
import axios from 'axios';
import PickerField from 'components/addProduct/PickerField';
// This page displays the details of a specific product based on the ID passed in the URL
// It uses the Product component to fetch and display product information

export default function Item() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [costModalVisible, setCostModalVisible] = React.useState(false);
  const [priceModalVisible, setPriceModalVisible] = React.useState(false);
  const [saleModalVisible, setSaleModalVisible] = React.useState(false);
  const [stockModalVisible, setStockModalVisible] = React.useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = React.useState(false);
  const [productTypeOptions, setProductTypeOptions] = React.useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const [inventory, setInventory] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchProduct = React.useCallback(async () => {
    try {
      const response = await fetch(`http://192.168.10.171:3001/api/products/${id}`);
      const productData = await response.json();
      
      // If your API returns data in the format: { success: true, data: {...} }
      // Extract the actual product data from the response
      const actualProductData = productData.data || productData;
      setInventory(actualProductData);
      console.log("Setting inventory to:", JSON.stringify(actualProductData, null, 2));
      
    } catch (error) {
      console.error('Error fetching product fuuuuuuu', error);
      
      
    } finally {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
      if (id) {
        fetchProduct();
      }
    }, [id, fetchProduct]);
  

    React.useEffect(() => { 
        const fetchProductTypes = async () => {
          try {
            const response = await fetch(`http://192.168.10.171:3001/api/product-types`);
            const objectData = await response.json();
            console.log("Fetched product types:", objectData);
            console.log("Fetched ");
            const mainData = objectData.data || objectData; // Adjust based on your API response structure
            // Set product type options from API response
            setProductTypeOptions(mainData);
          } catch (error) {
            console.error('Error fetching product types:', error);
          }
        };
    
        fetchProductTypes();
      }, []);

  const handleCostUpdate = () => {
    axios.put(`http://192.168.10.171:3001/api/products/${id}`, { totalCost: parseFloat(inventory.cost) })
      .then(response => {
        console.log('Cost updated successfully:', response.data);
        Alert.alert('Maliyet güncellendi.');
        // Refresh the product data to show updated values
        fetchProduct();
        setCostModalVisible(false);
      })
      .catch(error => {
        console.error('Error updating cost:', error);
        Alert.alert('Maliyet güncellenirken bir hata oluştu.');
      });
  };

  const handlePriceUpdate = () => {
    axios.put(`http://192.168.10.171:3001/api/products/${id}`, { salePrice: parseFloat(inventory.price) })
      .then(response => {
        console.log('Price updated successfully:', response.data);
        Alert.alert('Fiyat güncellendi.');
        // Refresh the product data to show updated values
        fetchProduct();
        setPriceModalVisible(false);
      })
      .catch(error => {
        console.error('Error updating price:', error);
        Alert.alert('Fiyat güncellenirken bir hata oluştu.');
      });
  };

  const handleStockUpdate = () => {
    axios.put(`http://192.168.10.171:3001/api/products/${id}`, { stockAmount: parseFloat(inventory.stock) })
      .then(response => {
        console.log('Stock updated successfully:', response.data);
        Alert.alert('Stok güncellendi.');
        // Refresh the product data to show updated values
        fetchProduct();
        setStockModalVisible(false);
      })
      .catch(error => {
        console.error('Error updating stock:', error);
        Alert.alert('Stok güncellenirken bir hata oluştu.');
      });
  };

  const handleCategoryUpdate = () => {
    ///TODO FIX THIS THING ρε μαλάκα  
    axios.put(`http://192.168.10.171:3001/api/products/${id}`, { productType: inventory.productType })
      .then(response => {
        console.log('Category updated successfully:', response.data);
        Alert.alert('Kategori güncellendi.');
        // Refresh the product data to show updated values
        fetchProduct();
        setCategoryModalVisible(false);
      })
      .catch(error => {
        console.error('Error updating category:', error);
        Alert.alert('Kategori güncellenirken bir hata oluştu.');
      });
  };

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
          visible={costModalVisible}
          onRequestClose={() => {
            setCostModalVisible(!costModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Maliyeti güncelle</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TextInput
                  style={styles.input}
                  placeholder="Yeni maliyet"
                  keyboardType="numeric"
                  onChangeText={text => setInventory({ ...inventory, cost: text })}
                  value={inventory.cost}
                />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleCostUpdate();
                  setCostModalVisible(!costModalVisible);
                  
                }}>
                <Text style={styles.textStyle}>Evet</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setCostModalVisible(!costModalVisible)}>
                <Text style={styles.textStyle}>Hayır</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={priceModalVisible}
          onRequestClose={() => {
            setPriceModalVisible(!priceModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Fiyatı güncelle</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TextInput
                  style={styles.input}
                  placeholder="Yeni fiyat"
                  keyboardType="numeric"
                  onChangeText={text => setInventory({ ...inventory, price: text })}
                  value={inventory.price}
                />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handlePriceUpdate();
                  setPriceModalVisible(!priceModalVisible);

                }}>
                <Text style={styles.textStyle}>Evet</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setPriceModalVisible(!priceModalVisible)}>
                <Text style={styles.textStyle}>Hayır</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      <Modal
          animationType="fade"
          transparent={true}
          visible={stockModalVisible}
          onRequestClose={() => {
            setStockModalVisible(!stockModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Stok Miktarını Güncelle</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <TextInput
                  style={styles.input}
                  placeholder="Yeni stok miktarı"
                  keyboardType="numeric"
                  onChangeText={text => setInventory({ ...inventory, stock: text })}
                  value={inventory.stock}
                />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleStockUpdate();
                  setStockModalVisible(!stockModalVisible);

                }}>
                <Text style={styles.textStyle}>Evet</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setStockModalVisible(!stockModalVisible)}>
                <Text style={styles.textStyle}>Hayır</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={categoryModalVisible}
          onRequestClose={() => {
            setCategoryModalVisible(!categoryModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Kategoriyi Güncelle</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <PickerField 
                          label="Ürün Tipi (WIP)" 
                          selectedValue={inventory.productType} 
                          onValueChange={text => setInventory({ ...inventory, productType: text })} 
                          options={productTypeOptions}
                          placeholder="Ürün tipini seçin"
                        />

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleCategoryUpdate();
                  setCategoryModalVisible(!categoryModalVisible);

                }}>
                <Text style={styles.textStyle}>Evet</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setCategoryModalVisible(!categoryModalVisible)}>
                <Text style={styles.textStyle}>Hayır</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>

       <Modal
          animationType="fade"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={() => {
            
            setDeleteModalVisible(!deleteModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Silmek istediğinizden emin misiniz?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleDeleteProduct();
                  setDeleteModalVisible(!deleteModalVisible);
                  router.back(); // Go back to the previous screen after deletion
                }}>
                <Text style={styles.textStyle}>Evet</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setDeleteModalVisible(!deleteModalVisible)}>
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
          <Product id={id} inventory={inventory} loading={loading} />
        </View>

        {/* Action Buttons Section */}
        <View className="mx-5 mt-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Ürün İşlemleri</Text>

          <View>
            <Pressable 
              onPress={() => setCostModalVisible(true)} 
              className="bg-emerald-500 rounded-xl p-4 shadow-sm mb-3"
            >
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">💰</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Maliyeti Belirle</Text>
                  <Text className="text-white text-xs opacity-80">Ürün maliyetini güncelle</Text>
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => setPriceModalVisible(true)} className="bg-amber-500 rounded-xl p-4 shadow-sm mb-3">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">🏷️</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Fiyatı Belirle</Text>
                  <Text className="text-white text-xs opacity-80">Satış fiyatını güncelle</Text>
                </View>
              </View>
            </Pressable>

            

            <Pressable onPress={() => setStockModalVisible(true)} className="bg-violet-500 rounded-xl p-4 shadow-sm mb-3">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">📦</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Stok Güncelle</Text>
                  <Text className="text-white text-xs opacity-80">Envanteri yönet</Text>
                </View>
              </View>
            </Pressable>

            <Pressable onPress={() => setSaleModalVisible(true)} className="bg-blue-500 rounded-xl p-4 shadow-sm mb-3">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">🛒</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Satış Yap WIP</Text>
                  <Text className="text-white text-xs opacity-80">Satış İşlemi gerçekleştir</Text>
                </View>
              </View>
            </Pressable>


            <Pressable onPress={() => setCategoryModalVisible(true)} className="bg-blue-500 rounded-xl p-4 shadow-sm mb-3">
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">📂</Text>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold mb-0.5">Kategori değiştir</Text>
                  <Text className="text-white text-xs opacity-80">Ürünün kategorisini değiştir</Text>
                </View>
              </View>
            </Pressable>



            <Pressable className="bg-red-500 rounded-xl p-4 shadow-sm" onPress={() => setDeleteModalVisible(true)}>
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
