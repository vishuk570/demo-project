import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import color from '../../../constants/theme';
import { checkNetworkConnection } from '../../../utils/networkUtils';
import { api } from '../../../utils/http.common';
import { showGenericError } from '../../../utils/toastUtils';
import { moderateScale } from 'react-native-size-matters';
// import QuarryDetails from './QuarryDetails';

const trucksDetails = [
  { name: 'AP 21 BP 7331', count: 5 },
  { name: 'UP 19 D 0343', count: 6 },
  { name: 'MH 12 RN 1289', count: 4 },
];

const TruckDetailsScreen = ({route}) => {
  const navigation = useNavigation();
  const [ quarryData, setQuarryData ] = React.useState([]);
  const [ quarryDetailsData, setQuarryDetailsData ] = React.useState(false);
  const [ quarryDetailsModal, setQuarryDetailsModal ] = React.useState(false);

  const handlePress = (item) => {
    navigation.navigate('TruckApprove', { name : item.name });
  };

  const handleDetailModal = (item) => {
    console.log("item", item);
    
    // setQuarryDetailsData(item);
    // setQuarryDetailsModal(!quarryDetailsModal);
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
     console.log("TruckDetailsScreen");
    //  getQuerryDetails();
     
    }, [])
  );


  const renderItem = ({ item }) => (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Text style={styles.stoneName}>{item.name}</Text>
      <View style={styles.rightSection}>
        <Text style={styles.count}>{item.count}</Text>
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
        data={trucksDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: moderateScale(6) }}
      />
      {/* <QuarryDetails
        visible={quarryDetailsModal}
        onClose={() => setQuarryDetailsModal(false)}
        quarryDetailsData={quarryDetailsData}
      /> */}
    </View>
  );
};

export default TruckDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: color.PrimaryBlue,
    padding: moderateScale(6),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
    justifyContent: 'space-between',
    elevation: 4,
    width: '85%',
  },
  card1: {
    backgroundColor: color.PrimaryBlue,
    padding: moderateScale(8),
    justifyContent:'center',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(5),
    elevation: 4,
    width: '15%',
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
    marginRight: moderateScale(5),
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
