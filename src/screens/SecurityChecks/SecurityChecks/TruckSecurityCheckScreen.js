import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import color from '../../../constants/theme';
import { moderateScale } from 'react-native-size-matters';

const TruckSecurityCheckScreen = ({ navigation, route }) => {
  const { blockMarkerRef, invoiceNumber, truckNumber, truckWeight } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [personnelName, setPersonnelName] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);

  const pickImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setCapturedImage(response.assets[0].uri);
        }
      }
    );
  };

  const onSave = () => {
    Alert.alert('Success', 'Details saved successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Block Marker Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Block Marker Ref - {blockMarkerRef}</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Date & Time</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
              <Text>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
            />
          )}

          <View style={styles.row}>
            <Text style={styles.label}>Wrapping</Text>
            <Text style={styles.value}>Yes</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Security Personnel</Text>
            <TextInput
              placeholder="First & Last Name"
              style={styles.input}
              value={personnelName}
              onChangeText={setPersonnelName}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Invoice Number</Text>
            <Text style={styles.value}>{invoiceNumber}</Text>
          </View>
        </View>

        {/* Truck Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Truck Details</Text>
          <Text style={styles.sectionValue}>Truck Number - {truckNumber}</Text>
          <Text style={styles.sectionValue}>Truck Weight - {truckWeight}</Text>

          <TouchableOpacity style={styles.docsRow}>
            <Text style={styles.sectionValue}>Truck Weight Documents</Text>
            <MaterialIcons name="description" size={28} color="#39497A" />
          </TouchableOpacity>
        </View>

        {/* Capture Image */}
        <TouchableOpacity style={styles.captureBtn} onPress={pickImage}>
          <Text style={styles.captureText}>Capture Image</Text>
        </TouchableOpacity>

        {capturedImage && (
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        )}

        <View style={{ height: 80 }} /> {/* Spacer for fixed button */}
      </ScrollView>

      {/* Fixed Save Button */}
      <View style={styles.fixedBottom}>
        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TruckSecurityCheckScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: moderateScale(10),
    paddingBottom: moderateScale(30), // extra padding for fixed button space
  },
  section: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: moderateScale(6),
    marginBottom: moderateScale(8),
  },
  sectionTitle: {
    backgroundColor: '#39497A',
    color: '#fff',
    paddingVertical: moderateScale(3),
    paddingHorizontal: moderateScale(4),
    borderRadius: 6,
    fontSize: 16,
    marginBottom: moderateScale(6),
  },
  sectionValue: {
    fontSize: 16,
    marginVertical: moderateScale(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(7),
  },
  label: {
    flex: 3,
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    flex: 5,
    fontSize: 16,
  },
  dateInput: {
    flex: 5,
    backgroundColor: '#F0F0F0',
    padding: moderateScale(5),
    borderRadius: 8,
  },
  input: {
    flex: 5,
    backgroundColor: '#F0F0F0',
    padding: moderateScale(5),
    borderRadius: 8,
  },
  docsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(6),
  },
  captureBtn: {
    backgroundColor: color.PrimaryBlue,
    padding: moderateScale(12),
    borderRadius: 10,
    marginBottom: moderateScale(8),
    alignItems: 'center',
  },
  captureText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: moderateScale(8),
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: moderateScale(5),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  saveBtn: {
    backgroundColor: color.PrimaryBlue,
    padding: moderateScale(8),
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
});
