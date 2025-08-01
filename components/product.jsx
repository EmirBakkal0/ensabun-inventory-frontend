import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Product(props) {
  const { id, inventory, loading } = props;
  // const [inventory, setInventory] = useState({});
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       // Use your servers's IP address instead of localhost
  //       const response = await fetch(`http://192.168.10.171:3001/api/products/${id}`);
  //       const productData = await response.json(); 
  //       console.log("Fetched product data:", productData);
        
  //       // If your API returns data in the format: { success: true, data: {...} }
  //       // Extract the actual product data from the response
  //       const actualProductData = productData.data || productData;
  //       setInventory(actualProductData);
  //       console.log("Setting inventory to:", JSON.stringify(actualProductData, null, 2));
        
  //     } catch (error) {
  //       console.error('Error fetching product fuuuuuuu', error);
        
        
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (id) {
  //     fetchProduct();
  //   }
  // }, [id]);

  if (loading) {
    return (
      <View>
        <Text className='font-bold text-lg'>Loading product...</Text>
      </View>
    );
  }


  return (
    <View>
      <Text className='font-bold  text-lg'>
                Ürün: {inventory?.productName || "No product name"}
              </Text>
              <Text>Ürün ID: {inventory?.productID || id}</Text>
              <Text>
                Stock: {inventory?.stockAmount || inventory?.stock || 0}
              </Text>
              <Text>
                Cost: {inventory?.totalCost || inventory?.cost || 0}
              </Text>
              <Text>
                Price: {inventory?.salePrice || inventory?.price || 0}
              </Text>
              <Text>
                Type: {inventory?.productType || "No type"}
              </Text>
              <Text>
                Description: {inventory?.description || "No description"}
              </Text>
    </View>
  )
}