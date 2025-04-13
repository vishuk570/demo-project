import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomDateTimePicker from '../../../components/CustomDateTimePicker';
import {moderateVerticalScale} from 'react-native-size-matters';
import {checkNetworkConnection} from '../../../utils/networkUtils';
import {api} from '../../../utils/http.common';
import {showGenericError, showToast} from '../../../utils/toastUtils';

const sampleImages = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&q=80',
    name: 'BRN:- SRGM1',
    dimensions: '186 x 150 x 170',
    type: 'M',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&q=80',
    name: 'BRN:- SRGM2',
    dimensions: '196 x 160 x 140',
    type: 'M',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&q=80',
    name: 'BRN:- SRGM3',
    dimensions: '186 x 150 x 170',
    type: 'G',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&q=80',
    name: 'BRN:- SRGM3',
    dimensions: '186 x 150 x 170',
    type: 'G',
  },
];

const BlocksScreen = ({route}) => {
  const navigation = useNavigation();
  const refId = route?.params?.refId;
  const [blockMarker, setBlockMarker] = useState('');
  const [selectedType, setSelectedType] = useState('G');
  const [blockData, setBlockData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const formatDate = date => {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    if (event.type === 'set') {
      setDate(currentDate);
    }
  };

  const getBlockData = async id => {
    console.log('Fetching block data for ID:', id);
    const isConnected = await checkNetworkConnection();
    if (!isConnected) return;
    // setIsLoading(true)
    try {
      const res = await api.get(`/blocks/quarry/${id}`);
      console.log('res', res);
      if (res?.data?.length > 0) {
        const fetchedBlockData = res.data;
        setBlockData(fetchedBlockData);
      } else {
        setBlockData([]);
      }
      //   setIsLoading(false)
    } catch (e) {
      //   setIsLoading(false)
      showGenericError();
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (refId) {
        // const Id = route.params.value;
        getBlockData(refId);
      }
      // return () => setProductionShifts([])
    }, [refId]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputField}>
          <Text style={styles.label}>Block Marker</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter reference number"
            value={blockMarker}
            onChangeText={setBlockMarker}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (blockMarker.trim()) {
              // Add your logic here
              console.log({blockMarker, selectedType, date});
              navigation.navigate('BlockDetailForm', {
                referenceNumber: blockMarker,
                refId: refId
              });
              setBlockMarker('')
            } else {
              showToast('error', 'Alert', 'Please enter reference number.');
            }
          }}>
          <Text style={styles.addButtonText}>Add Block</Text>
        </TouchableOpacity>


        {/* <View style={styles.inputField}>
          <Text style={styles.label}>Date & Time</Text>
          <CustomDateTimePicker
            // label="Select Date"
            value={date} // ISO string or null
            onChange={newDate => setDate(newDate)}
            placeholder="Select a date"
          />
        </View> */}

        <View style={styles.inputField}>
          <Text style={styles.label}>Type</Text>
          <View style={styles.typeButtons}>
            {['G', 'M'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeBtn,
                  selectedType === type && styles.selectedType,
                ]}
                onPress={() => setSelectedType(type)}>
                <Text
                  style={[
                    styles.typeText,
                    selectedType === type && styles.selectedTypeText,
                  ]}>
                  {type === 'G' ? 'granite' : 'marbles'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={blockData}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setModalVisible(true);
            }}
            style={styles.blockCard}>
            <View >
              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&q=80',
                }}
                style={styles.blockImage}
                resizeMode="cover"
              />
              <View style={styles.blockInfo}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.blockName}>{item.blockColor}</Text>
                  <Text style={styles.blockDimensions}>
                    {item?.blockDimension?.blockLength +
                      ' X ' +
                      item?.blockDimension?.blockWidth +
                      ' X ' +
                      item?.blockDimension?.blockHeight}
                  </Text>
                </View>
                <View style={{flex: 1, backgroundColor: '#E9ECEF'}}>
                  <Text style={styles.blockName}>
                    {item?.type === 'm' ? 'Marble' : 'Granite'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&q=80',
                }}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <Text style={styles.modalTitle}>{selectedItem.refNumber}</Text>
              <Text>Color: {selectedItem.blockColor}</Text>
              <Text>Quality: {selectedItem.blockQualityGrade}</Text>
              <Text>
                Dimensions: {selectedItem?.blockDimension?.blockLength} x{' '}
                {selectedItem?.blockDimension?.blockWidth} x{' '}
                {selectedItem?.blockDimension?.blockHeight}
              </Text>
              <Text>
                Type: {selectedItem?.type === 'm' ? 'Marble' : 'Granite'}
              </Text>
              <Text>Volume: {selectedItem?.blockDimension?.blockVolume}</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: '#fff'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  inputField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#4B5E9E',
    borderColor: '#4B5E9E',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  selectedTypeText: {
    color: '#fff',
  },
  dateButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  dateText: {
    fontSize: 16,
    color: '#212529',
  },
  addButton: {
    backgroundColor: '#4B5E9E',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    padding: 8,
  },
  blockCard: {
    // flex: 1,
    width: '45%',
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  blockImage: {
    width: '100%',
    height: 150,
  },
  blockInfo: {
    padding: 12,
  },
  blockName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  blockDimensions: {
    fontSize: 12,
    color: '#6C757D',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4B5E9E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  
});

export default BlocksScreen;
