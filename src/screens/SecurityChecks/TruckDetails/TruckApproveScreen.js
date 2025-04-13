import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import color from '../../../constants/theme';

const items = ['SRGM1', 'SRGM2', 'SRGM3', 'SRGM4', 'SRGM5'];

const TruckApproveScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { truckName } = route.params;

  const [blockRefNo, setBlockRefNo] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    const TruckNumber = truckName?.replace(/\s/g, '');
    console.log(TruckNumber, truckName);  
    navigation.navigate('TruckSecurityCheck', {
        blockMarkerRef: item,
        invoiceNumber: 'INV-21-12-009',
        truckNumber: TruckNumber,
        truckWeight: '10 tons',
      });
  };

  const handleApprove = () => {
    console.log('Approved:', {
      truck: truckName,
      blockRefNo,
      selectedItem
    });
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemButton,
        selectedItem === item && { backgroundColor: '#3A5BA0' }
      ]}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.itemText}>{item}</Text>
      <Icon name="play" size={20} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Block Marker Reference Number</Text>
      <TextInput
        style={styles.input}
        value={blockRefNo}
        onChangeText={setBlockRefNo}
        keyboardType="numeric"
        placeholder="Enter Ref No"
        placeholderTextColor="#888"
      />

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
      />

      <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
        <Text style={styles.approveButtonText}>Approve</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TruckApproveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  label: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    color: '#000'
  },
  itemButton: {
    backgroundColor: color.PrimaryBlue,
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
    elevation: 4
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  approveButton: {
    backgroundColor: color.PrimaryBlue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    marginTop: 20
  },
  approveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
