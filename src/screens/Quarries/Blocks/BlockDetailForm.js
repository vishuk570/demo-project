import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { api } from '../../../utils/http.common';
import { showToast } from '../../../utils/toastUtils';

const BlockDetailForm = ({route, navigation}) => {
  const {referenceNumber, refId} = route.params;

  const [blockColor, setBlockColor] = useState('');
  const [date, setDate] = useState(new Date());
  const [blockType, setBlockType] = useState('');
  const [blockGrade, setBlockGrade] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [volume, setVolume] = useState('');
  const [quarryRefId, setQuarryRefId] = useState('');
  const [purchasingUnit, setPurchasingUnit] = useState('');
  const [isWrapping, setIsWrapping] = useState(false);
  const [truckNumber, setTruckNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [images, setImages] = useState([]);

  const handleSave = async () => {
    const data = {
      refNumber: referenceNumber,
      type: blockType.toLowerCase() === 'marble' ? 'm' : 'g',
      dateTime: date.toISOString(),
      blockColor: blockColor,
      blockQualityGrade: blockGrade,
      blockDimension: {
        blockLength: parseFloat(length),
        blockWidth: parseFloat(width),
        blockHeight: parseFloat(height),
        blockVolume: parseFloat(volume)
      },
      additionalDetails: {
        purchasingUnit,
        wrappingRequired: isWrapping,
        truckNumber,
        invoiceNumber,
        attachments: images
      },
      quarryRefId: refId,
    };
    
    try {
      const res = await api.post('/blocks', data);
      console.log("Data saved successfully", res);
      showToast('success', 'Success', 'Data saved successfully');
      navigation.goBack();
    } catch(e) {
      console.log("Error", e);
      showToast('error', 'Error', 'Failed to save data');
    }
  };

  const handleVolumeCalculation = () => {
    const vol = parseFloat(length) * parseFloat(width) * parseFloat(height);
    if (!isNaN(vol)) setVolume(vol.toFixed(2));
    else setVolume('');
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 0,
      },
      response => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          const uris = response.assets.map(asset => asset.uri);
          setImages(prev => [...prev, ...uris]);
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Block Marker Reference Number</Text>
          <View style={styles.valueBox}>
            <Text style={styles.valueText}>{referenceNumber}</Text>
          </View>

          <Text style={styles.label}>Block Color</Text>
          <View style={styles.inputBox}>
            <Picker
              selectedValue={blockColor}
              onValueChange={v => setBlockColor(v)}>
              <Picker.Item label="Select Color" value="" />
              <Picker.Item label="White" value="white" />
              <Picker.Item label="Red" value="red" />
              <Picker.Item label="Black" value="black" />
              <Picker.Item label="Blue" value="blue" />
            </Picker>
          </View>

          <View style={styles.row}>
            <View style={styles.halfBox}>
              <Text style={styles.label}>Block Type</Text>
              <View style={styles.radioRow}>
                {['Marble', 'Granite'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.radioItem}
                    onPress={() => setBlockType(item)}>
                    <View style={styles.radioCircle}>
                      {blockType === item && <View style={styles.radioDot} />}
                    </View>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.halfBox}>
              <Text style={styles.label}>Block Grade</Text>
              <View style={styles.radioRow}>
                {['A', 'B', 'C', 'D'].map(item => (
                  <TouchableOpacity
                    key={item}
                    style={styles.radioItem}
                    onPress={() => setBlockGrade(item)}>
                    <View style={styles.radioCircle}>
                      {blockGrade === item && <View style={styles.radioDot} />}
                    </View>
                    <Text>{`Grade ${item}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.subHeader}>Block Dimensions</Text>
          {[
            ['Block Length', length, setLength],
            ['Block Width', width, setWidth],
            ['Block Height', height, setHeight],
          ].map(([label, value, setter]) => (
            <TextInput
              key={label}
              placeholder={label}
              value={value}
              onChangeText={text => {
                setter(text);
                handleVolumeCalculation();
              }}
              keyboardType="numeric"
              style={styles.input}
            />
          ))}
          <TextInput
            placeholder="Block Volume (auto)"
            value={volume}
            editable={false}
            style={styles.input}
          />

          <Text style={styles.subHeader}>Additional Details</Text>
          <TextInput
            placeholder="Purchasing Units"
            value={purchasingUnit}
            onChangeText={setPurchasingUnit}
            style={styles.input}
          />
          <Text style={styles.label}>Wrapping Required?</Text>
          <View style={styles.radioRow}>
            {['Yes', 'No'].map(val => (
              <TouchableOpacity
                key={val}
                style={styles.radioItem}
                onPress={() => setIsWrapping(val === 'Yes')}>
                <View style={styles.radioCircle}>
                  {isWrapping === (val === 'Yes') && (
                    <View style={styles.radioDot} />
                  )}
                </View>
                <Text>{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            placeholder="Truck Number"
            value={truckNumber}
            onChangeText={setTruckNumber}
            style={styles.input}
          />
          <TextInput
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
            style={styles.input}
          />

          <Text style={styles.subHeader}>Attachments</Text>
          <ScrollView horizontal>
            <TouchableOpacity onPress={pickImage} style={styles.imageBox}>
              <Icon name="plus" size={24} />
            </TouchableOpacity>
            {images.map((img, idx) => (
              <Image key={idx} source={{uri: img}} style={styles.imageBox} />
            ))}
          </ScrollView>

          <View style={styles.iconContainer}>
            <Icon name="microphone" size={28} style={{marginRight: 10}} />
            <Icon name="video" size={28} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  valueBox: {
    backgroundColor: '#E9F0FF',
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    marginBottom: 4,
    marginTop: 12,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  halfBox: {
    width: '100%',
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  imageBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#4158D0',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BlockDetailForm;