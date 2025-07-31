import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import InputField from 'components/addProduct/InputField';
import PickerField from 'components/addProduct/PickerField';
import axios from 'axios';

export default function AddProduct() {
  const [productName, setProductName] = React.useState('');
  const [productPrice, setProductPrice] = React.useState('');
  const [productCost, setProductCost] = React.useState('');
  const [productQuantity, setProductQuantity] = React.useState(0);
  const [productType, setProductType] = React.useState('');
  const [productTypeOptions, setProductTypeOptions] = React.useState([
   
  ]);

  useEffect(() => { 
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

  console.log('Product Type Options:', productTypeOptions);

  const handleAddProduct = () => {
    // Validate required fields
    if (!productName || !productCost || !productPrice || !productQuantity || !productType) {
      alert('Lütfen tüm alanları doldurun');
      return;
    }

    // Create product object
    const newProduct = {
      productName,
      totalCost: parseFloat(productCost),
      salePrice: parseFloat(productPrice),
      stockAmount: parseInt(productQuantity),
      productTypeID: parseInt(productType) // Now using productTypeID from API
    };

    console.log('New product:', newProduct);
    // Here you would typically send the data to your API
    // Example: postProduct(newProduct);

    axios.post(`http://192.168.10.171:3001/api/products`, newProduct)
      .then(response => {
        console.log('Product added successfully:', response.data);
        alert('Ürün başarıyla eklendi!');
      })
      .catch(error => {
        console.error('Error adding product:', error);
        alert('Ürün eklenirken bir hata oluştu.');
      });

    // Reset form
    setProductName('');
    setProductCost('');
    setProductPrice('');
    setProductQuantity(0);
    setProductType('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: `Yeni Ürün Ekle`,
          headerShown: true,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <InputField label="Ürün Adı" value={productName} onChangeText={setProductName} placeholder="Ürün adını girin" />
        <InputField label="Maaliyet" value={productCost} onChangeText={setProductCost} placeholder="Maliyet fiyatını girin" keyboardType="numeric" />
        <InputField label="Satış Fiyatı" value={productPrice} onChangeText={setProductPrice} placeholder="Satış fiyatını girin" keyboardType="numeric" />
        <InputField label="Stok Miktarı" value={productQuantity} onChangeText={setProductQuantity} placeholder="Stok miktarını girin" keyboardType="numeric" />
        <PickerField 
          label="Ürün Tipi" 
          selectedValue={productType} 
          onValueChange={setProductType} 
          options={productTypeOptions}
          placeholder="Ürün tipini seçin"
        />

        <Pressable style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Ürün Ekle</Text>
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
