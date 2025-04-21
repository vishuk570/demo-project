import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Linking, 
  ScrollView,
  Modal,
  SafeAreaView,
  StatusBar,
  Platform 
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QuarryDetails = ({ visible, onClose, quarryDetailsData }) => {
  const handleOpenMap = async () => {
    const mapUrl = `https://maps.app.goo.gl/vYxaLKuzhpGgtAUR7/lat=${quarryDetailsData.location.latitude}/lng=${quarryDetailsData.location.longitude}`;
    try {
      await Linking.openURL(mapUrl);
    } catch (error) {
      console.error('Error opening map:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#4B5E9E', justifyContent: 'center',alignSelf:'center',alignItems:'center',alignContent:'center',textAlign:'center' }}>
              Quarry Details
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#4B5E9E" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ 
                    uri: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=500&q=80' 
                  }}
                  style={styles.logo}
                />
              </View>

              <Text style={styles.heading}>{quarryDetailsData.name}</Text>

              <View style={styles.card}>
                <View style={styles.sectionHeader}>
                  <Icon name="city" size={24} color="#4B5E9E" />
                  <Text style={styles.sectionTitle}>Quarry Address</Text>
                </View>
                <Text style={styles.text}>
                {quarryDetailsData.address}
                </Text>
              </View>

              <View style={styles.card}>
                <View style={styles.sectionHeader}>
                  <Icon name="map-marker-radius" size={24} color="#4B5E9E" />
                  <Text style={styles.sectionTitle}>Quarry Location</Text>
                </View>
                <TouchableOpacity 
                  style={styles.mapButton}
                  onPress={handleOpenMap}
                >
                  <Icon name="google-maps" size={24} color="#fff" />
                  <Text style={styles.mapButtonText}>Open in Maps</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
  modalHeader: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#fff',
  },
  closeButton: {
    padding: moderateScale(6),
    position: 'absolute',
    right: moderateScale(4),
    top: moderateScale(5),
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: moderateScale(10),
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: moderateScale(10),
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  imageContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: moderateScale(6),
    marginBottom: moderateScale(12),
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: moderateScale(10),
    width: '100%',
    marginBottom: moderateScale(12),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(6),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5E9E',
    marginLeft: moderateScale(4),
  },
  text: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    textAlign: 'center',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B5E9E',
    padding: moderateScale(8),
    borderRadius: 10,
    marginTop: moderateScale(4),
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: moderateScale(2),
  },
});

export default QuarryDetails;