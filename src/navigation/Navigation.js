import {Alert, StyleSheet, TouchableOpacity, View, Text, Modal} from 'react-native';
import React, {useState} from 'react';
import {
  LoginScreen,
  SignupScreen,
  ForgetPassScreen,
  Splash,
  IntroScreen,
  QuarryDetailsScreen,
  BlockDetailForm,
  TruckDetailsScreen,
  TruckApproveScreen,
  TruckSecurityCheckScreen
} from '../screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BlocksScreen from '../screens/Quarries/Blocks/BlocksScreen';
import { setAuthToken } from '../utils/http.common';
import { removeItem } from '../utils/asyncStorage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import color from '../constants/theme';

const Stack = createNativeStackNavigator();

const HeaderRightMenu = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await removeItem('authToken');
      setAuthToken(null);
      setModalVisible(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginRight: 15}}>
        <Icon name="account-circle" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Icon name="logout" size={20} color="#15406B" />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen options={{headerShown: false}} name="Splash" component={Splash} />
      <Stack.Screen options={{headerShown: false}} name="IntroScreen" component={IntroScreen} />
      <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown: false}} name="Signup" component={SignupScreen} />
      <Stack.Screen options={{headerShown: false}} name="ForgetPass" component={ForgetPassScreen} />

      <Stack.Screen
        name="QuarryDetails"
        component={QuarryDetailsScreen}
        options={({route}) => ({
          headerShown: true,
          headerBackVisible: true,
          headerTitle: route.params?.quarryName || 'Quarry Details',
          headerTitleAlign: 'left',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: color.PrimaryBlue,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerRight: () => <HeaderRightMenu />,
        })}
      />

      {/* Other screens */}
      <Stack.Screen
        name="BlocksScreen"
        component={BlocksScreen}
        options={({route}) => ({
          headerTitle: route.params?.name || 'Block Detail',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: color.PrimaryBlue,},
          headerRight: () => <HeaderRightMenu />,
        })}
      />

      <Stack.Screen
        name="BlockDetailForm"
        component={BlockDetailForm}
        options={({route}) => ({
          headerTitle: route.params?.stoneName || 'Block Detail',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: color.PrimaryBlue,},
          headerRight: () => <HeaderRightMenu />,
        })}
      />

      <Stack.Screen
        name="TruckDetails"
        component={TruckDetailsScreen}
        options={({route}) => ({
          headerTitle: route.params?.stoneName || 'Truck Details',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: color.PrimaryBlue,},
          headerRight: () => <HeaderRightMenu />,
        })}
      />

      <Stack.Screen
        name="TruckApprove"
        component={TruckApproveScreen}
        options={({route}) => ({
          headerTitle: route.params?.name || 'Truck Approval',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: color.PrimaryBlue,},
          headerRight: () => <HeaderRightMenu />,
        })}
      />

      <Stack.Screen
        name="TruckSecurityCheck"
        component={TruckSecurityCheckScreen}
        options={({route}) => ({
          headerTitle: route.params?.name || 'Security Check',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: color.PrimaryBlue,},
          headerRight: () => <HeaderRightMenu />,
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 55,
    paddingRight: 15,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: 160,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: color.PrimaryBlue,
  },
});
