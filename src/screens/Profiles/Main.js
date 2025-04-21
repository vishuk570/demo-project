import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  Switch,
  Modal,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import VectorIcon from '../../assets/vectorIcons/VectorIcons';
import {moderateScale} from 'react-native-size-matters';
import color from '../../constants/theme';
import { setAuthToken } from '../../utils/http.common';
import { removeItem } from '../../utils/asyncStorage';

const Main = ({navigation}) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    const finalValue = expanded ? 0 : 1;
    setExpanded(!expanded);

    Animated.timing(animation, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: finalValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90],
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '270deg'],
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    removeItem('authToken');
    setAuthToken(null);
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <VectorIcon
          icon="AntDesign"
          name="arrowleft"
          size={moderateScale(24)}
          color="#333"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.8}
        style={expanded ? styles.cardExpanded : styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.headerText}>Hi, User Name</Text>
          <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
            <VectorIcon
              icon="Feather"
              name="chevron-right"
              size={24}
              color="#333"
            />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.cardContent, {height: heightInterpolate}]}>
        <View style={styles.infoRow}>
          <VectorIcon
            icon="Feather"
            name="phone"
            size={20}
            color={color.PrimaryBlue}
            style={styles.icon}
          />
          <Text style={styles.infoText}>+91 98331 31381</Text>
        </View>
        <View style={styles.infoRow}>
          <VectorIcon
            icon="Feather"
            name="mail"
            size={20}
            color={color.PrimaryBlue}
            style={styles.icon}
          />
          <Text style={styles.infoText}>user@gmail.com</Text>
        </View>
      </Animated.View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <VectorIcon
            icon="Feather"
            name="lock"
            size={20}
            color="#333"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <VectorIcon
            icon="Feather"
            name="info"
            size={20}
            color="#333"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <VectorIcon
            icon="Feather"
            name="help-circle"
            size={20}
            color="#333"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <VectorIcon
            icon="Feather"
            name="phone"
            size={20}
            color="#333"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Settings')}>
          <VectorIcon
            icon="Feather"
            name="settings"
            size={20}
            color="#333"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <View style={styles.optionButton}>
          <VectorIcon
            icon="Feather"
            name="moon"
            size={20}
            color="#333"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Dark Mode</Text>
          <View style={styles.flexSpacer} />
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{false: '#ccc', true: '#4B5E9E'}}
            thumbColor={
              Platform.OS === 'android'
                ? isDarkMode
                  ? '#fff'
                  : '#fff'
                : undefined
            }
          />
        </View>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => setLogoutModalVisible(true)}>
          <VectorIcon
            icon="Feather"
            name="log-out"
            size={20}
            color="#333"
            style={styles.optionIcon}
          />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalActions}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setLogoutModalVisible(false)}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable style={styles.logoutBtn} onPress={confirmLogout}>
                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(12),
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: moderateScale(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardExpanded: {
    backgroundColor: '#fff',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: moderateScale(12),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
  },
  cardContent: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    paddingHorizontal: moderateScale(7),
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  icon: {
    marginRight: moderateScale(8),
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  optionsContainer: {
    marginTop: moderateScale(20),
    backgroundColor: '#fff',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(8),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionIcon: {
    marginRight: moderateScale(10),
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  backBtn: {
    marginBottom: moderateScale(25),
  },
  flexSpacer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: moderateScale(20),
    alignItems: 'center',
    zIndex: 2,
  },
  modalText: {
    fontSize: 16,
    marginBottom: moderateScale(20),
    textAlign: 'center',
    color: '#333',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoutBtn: {
    flex: 1,
    padding: moderateScale(8),
    marginHorizontal: moderateScale(3),
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#e74c3c',
  },
  cancelBtn: {
    flex: 1,
    padding: moderateScale(8),
    marginHorizontal: moderateScale(3),
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  logoutText: {
    color: '#fff',
  },
});
