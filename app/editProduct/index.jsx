import { View, Text,SafeAreaView,ScrollView ,Pressable, StyleSheet} from 'react-native'
import React from 'react'
import InputField from 'components/addProduct/InputField';
import PickerField from 'components/addProduct/PickerField';
import { Stack } from 'expo-router';
import axios from 'axios';

export default function EditProduct() {
  
  const [productType, setProductType] = React.useState('');
    const [productTypeOptions, setProductTypeOptions] = React.useState([]);
    const [productName, setProductName] = React.useState('');
    const [productNameOptions, setProductNameOptions] = React.useState([]);
    const [productCost, setProductCost] = React.useState('');
    const [productPrice, setProductPrice] = React.useState('');
    const [productQuantity, setProductQuantity] = React.useState('');


    const handleEditProduct = async () => {
      try {
        const response = await axios.put(`/api/products/}`, {
          productType,
          productName,
          productCost,
          productPrice,
          productQuantity,
        });
        console.log('Product edited successfully:', response.data);
      } catch (error) {
        console.error('Error editing product:', error);
      }
    };

    return (
    
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: `Ürün Ekle`,
          headerShown: true,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <PickerField 
          label="Ürün Tipi" 
          selectedValue={productType} 
          onValueChange={setProductType} 
          options={productTypeOptions}
          placeholder="Ürün tipini seçin"
        />
        <PickerField
          label="Ürün"
          selectedValue={productName}
          onValueChange={setProductName}
          options={productNameOptions}
          placeholder="Ürünün kendisini seçin"
        />
        <InputField label="Ürün Adı" value={productName} onChangeText={setProductName} placeholder="Ürün adını girin" />
        <InputField label="Maaliyet" value={productCost} onChangeText={setProductCost} placeholder="Maliyet fiyatını girin" keyboardType="numeric" />
        <InputField label="Satış Fiyatı" value={productPrice} onChangeText={setProductPrice} placeholder="Satış fiyatını girin" keyboardType="numeric" />
        <InputField label="Stok Miktarı" value={productQuantity} onChangeText={setProductQuantity} placeholder="Stok miktarını girin" keyboardType="numeric" />

        <Pressable style={styles.button} onPress={handleEditProduct}>
          <Text style={styles.buttonText}>Ürünü Düzenle</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
