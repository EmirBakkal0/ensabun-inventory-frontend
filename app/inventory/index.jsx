import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native'
import React from 'react'
import axios from 'axios';
import { useRouter, Stack, useFocusEffect } from 'expo-router';


export default function Inventory() {
    const [inventoryData, setInventoryData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedType, setSelectedType] = React.useState('Hepsi'); // New state for filter
    const router = useRouter();
    
    const fetchData = React.useCallback(async () => {
        try {
            setLoading(true);
            // Fetching inventory data from the API
            const response = await axios.get('http://192.168.10.171:3001/api/products')
            const data = response.data.data || response.data; // Handle API response structure
            
            // Sort products by productType
            const sortedData = data.sort((a, b) => {
                if (a.productType && b.productType) {
                    return a.productType.localeCompare(b.productType);
                }
                return 0;
            });
            
            setInventoryData(sortedData);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Refresh data when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    

    const renderProductItem = ({ item }) => (
        <Pressable style={styles.productCard} onPress={() => router.push(`/item/${item.productID}`)}>
            <View style={styles.productHeader}>
                <Text style={styles.productName}>{item.productName || 'Bilinmeyen ürün'}</Text>
                <View style={[styles.stockBadge, item.stockAmount === 0 ? styles.outOfStock : styles.inStock]}>
                    <Text style={styles.stockText}>
                        {item.stockAmount === 0 ? 'Stokta yok' : `${item.stockAmount} tane stokta var`}
                    </Text>
                </View>
            </View>
            
            <View style={styles.productDetails}>
                <Text style={styles.productType}>Type: {item.productType || 'N/A'}</Text>
                <Text style={styles.productId}>ID: {item.productID}</Text>
            </View>
            
            <View style={styles.priceContainer}>
                <Text style={styles.costText}>Cost: ₺{item.totalCost || 0}</Text>
                <Text style={styles.priceText}>Price: ₺{item.salePrice || 0}</Text>
            </View>
        </Pressable>
    );

    const groupedData = React.useMemo(() => {
        // Filter data based on selected type
        const filteredData = selectedType === 'Hepsi' 
            ? inventoryData 
            : inventoryData.filter(item => item.productType === selectedType);
            
        const groups = {};
        filteredData.forEach(item => {
            const type = item.productType || 'Diğer';
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(item);
        });
        return groups;
    }, [inventoryData, selectedType]);

    // Get unique product types for the selector
    const productTypes = React.useMemo(() => {
        const types = ['Hepsi', ...new Set(inventoryData.map(item => item.productType || 'Diğer'))];
        return types.sort();
    }, [inventoryData]);

    const filteredInventoryCount = React.useMemo(() => {
        return selectedType === 'Hepsi' 
            ? inventoryData.length 
            : inventoryData.filter(item => item.productType === selectedType).length;
    }, [inventoryData, selectedType]);

    // Dropdown selector component
    const TypeSelector = () => {
        const [isVisible, setIsVisible] = React.useState(false);

        return (
            <View style={styles.selectorContainer}>
                <Text style={styles.selectorLabel}>Türe göre filtrele:</Text>
                <TouchableOpacity 
                    style={styles.selectorButton}
                    onPress={() => setIsVisible(true)}
                >
                    <Text style={styles.selectorText}>{selectedType}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>

                <Modal
                    visible={isVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsVisible(false)}
                >
                    <TouchableOpacity 
                        style={styles.modalOverlay}
                        onPress={() => setIsVisible(false)}
                    >
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.dropdownTitle}>Ürünün Türünü Seçin</Text>
                            <FlatList
                                data={productTypes}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.dropdownItem,
                                            selectedType === item && styles.selectedItem
                                        ]}
                                        onPress={() => {
                                            setSelectedType(item);
                                            setIsVisible(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.dropdownItemText,
                                            selectedType === item && styles.selectedItemText
                                        ]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Stack.Screen
                    options={{
                        title: `Envanter`,
                        headerShown: true,
                    }}
                />
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Envanter yükleniyor...</Text>
                </View>
            </SafeAreaView>
        );
    }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: `Envanter`,
          headerShown: true,
        }}
      />
      
      <TypeSelector />
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          {selectedType === 'Hepsi' ? 'Toplam Ürünler' : `${selectedType} Ürünler`}: {filteredInventoryCount}
        </Text>
        <Text style={styles.summaryText}>Kategoriler: {Object.keys(groupedData).length}</Text>
      </View>

      <FlatList
        data={Object.keys(groupedData).sort()}
        keyExtractor={(item) => item}
        renderItem={({ item: productType }) => (
          <View style={styles.categorySection}>
            <Text style={styles.categoryHeader}>{productType}</Text>
            <FlatList
              data={groupedData[productType]}
              keyExtractor={(item) => item.productID?.toString() || Math.random().toString()}
              renderItem={renderProductItem}
              scrollEnabled={false}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e5f3ff',
    marginBottom: 8,
  },
  productCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inStock: {
    backgroundColor: '#dcfce7',
  },
  outOfStock: {
    backgroundColor: '#fecaca',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productType: {
    fontSize: 14,
    color: '#666',
  },
  productId: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  costText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 16,
    color: '#22c55e',
    fontWeight: '600',
  },
  // Selector styles
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    minWidth: 120,
  },
  selectorText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '80%',
    maxHeight: '60%',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  selectedItem: {
    backgroundColor: '#e5f3ff',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#6b7280',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});