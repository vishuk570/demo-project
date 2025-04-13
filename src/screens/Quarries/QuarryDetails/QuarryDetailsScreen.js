import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import color from '../../../constants/theme';
import { checkNetworkConnection } from '../../../utils/networkUtils';
import { api } from '../../../utils/http.common';
import { showGenericError } from '../../../utils/toastUtils';
import QuarryDetails from './QuarryDetails';

const stones = [
  { name: 'Deccan Granites', count: 35 },
  { name: 'Bengal Black Granite', count: 20 },
  { name: 'SCA Grey Granite', count: 50 },
];

const QuarryScreen = ({route}) => {
  const navigation = useNavigation();
  const [ quarryData, setQuarryData ] = React.useState([]);
  const [ quarryDetailsData, setQuarryDetailsData ] = React.useState(false);
  const [ quarryDetailsModal, setQuarryDetailsModal ] = React.useState(false);

  const handlePress = (item) => {
    navigation.navigate('BlocksScreen', { refId: item.refId, name : item.name });
  };

  const handleDetailModal = (item) => {
    console.log("item", item);
    
    setQuarryDetailsData(item);
    setQuarryDetailsModal(!quarryDetailsModal);
  }

  const getQuerryDetails = async (id) => {
    const isConnected = await checkNetworkConnection();
    if (!isConnected) return;
    // setIsLoading(true)
    try {
      const res = await api.get('/quarries');
      console.log("res", res.data);
      if (res?.data?.length > 0) {
        const fetchedQuarryData = res.data;
        setQuarryData(fetchedQuarryData);
      } else {
        setQuarryData([]);
      }
    //   setIsLoading(false)
    } catch (e) {
    //   setIsLoading(false)
      showGenericError()
    }
  }


  useFocusEffect(
    useCallback(() => {
     console.log("QuarryScreen");
     getQuerryDetails();
     
    }, [])
  );


  const renderItem = ({ item }) => (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Text style={styles.stoneName}>{item.name}</Text>
      <View style={styles.rightSection}>
        <Text style={styles.count}>{item.value}</Text>
        <Icon name="chevron-right" size={24} color='#fff' />
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.card1} onPress={() => handleDetailModal(item)}>
    <Text style={{color:'#fff', fontSize:10}}>Detail</Text>
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={quarryData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
      <QuarryDetails
        visible={quarryDetailsModal}
        onClose={() => setQuarryDetailsModal(false)}
        quarryDetailsData={quarryDetailsData}
      />
    </View>
  );
};

export default QuarryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: color.PrimaryBlue,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
    elevation: 4,
    width: '90%',
  },
  card1: {
    backgroundColor: color.PrimaryBlue,
    padding: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10,
    elevation: 4,
    width: '10%',
  },
  stoneName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  count: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
