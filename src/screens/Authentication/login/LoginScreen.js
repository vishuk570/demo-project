import { Alert, BackHandler, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import color from '../../../constants/theme'
import CustomText from '../../../components/CustomText';
import AuthHeader from '../../../components/AuthHeader';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomBtn from '../../../components/CustomBtn';
import AuthBottom from '../../../components/AuthBottom';
import ProviderBottom from '../../../components/ProviderBottom';
import { checkNetworkConnection } from '../../../utils/networkUtils';
import { showGenericError, showToast } from '../../../utils/toastUtils';
import { isValidEmail } from '../../../utils/Validations';
import { api, setAuthToken } from '../../../utils/http.common';
import { setItem } from '../../../utils/asyncStorage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };

  // Login API integrate
  const handleLogin = async (OTP = '') => {
    const isConnected = await checkNetworkConnection();
    if (!isConnected) return;
    
    if (!email) {
        showToast('error', 'Alert', 'Please enter your email.');
        return;
    }
    if (email != '') {
        const res = isValidEmail(email)
        if (!res) {
            showToast('error', 'Alert', 'Please enter a valid email.')
            return;
        }
    }
    if (!password.trim()) {
        showToast('error', 'Alert', 'Please enter your password.');
        return;
    }

    // setIsLoading(true)
    const data = {
      email: email,
      password: password,
    }
    
    try {
        const res = await api.post(`/users/login`, data)
        console.log("res+++++++++++",res.data);
        
        if (res?.data?.token) {
            setItem('authToken', res?.data?.token)
            setAuthToken(res?.data?.token)
            // setItem('loginData', JSON.stringify(res.data.Data))
            navigation.navigate('QuarryDetails');
        } else {
            // showToast('error', 'Alert', res.data.Message)
            showGenericError()
        }
        // setIsLoading(false)
    } catch (e) {
        // setIsLoading(false)
        showGenericError()
    }
}

    // BackHandler
    const backAction = () => {
        Alert.alert('SPS', 'Are you sure you want to exit?', [
            {
                text: 'NO',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    useEffect(() => {
         const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
            backHandler.remove();
        };
    }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.mainContainer}>
          <View style={styles.mainStyle}>
            <AuthHeader />
            <View >
              <CustomTextInput
                labelName='Username'
                value={email}
                onChangeText={(actualData) => setEmail(actualData)}
                autoCapitalize='none'
              />
              <CustomTextInput
                labelName='Password'
                secureTextEntry={true}
                value={password}
                onChangeText={(actualData) => setPassword(actualData)}
              />
              <TouchableOpacity
                style={styles.forgetView}
                onPress={() => navigation.navigate('ForgetPass')}
              >
                <CustomText
                  text={'Forgot password?'}
                  textStyle={styles.forgetText}
                />
              </TouchableOpacity>
              <CustomBtn
                btnText="Sign in"
                onPress={() => handleLogin()}
              />
            </View>
          </View>
          <View style={styles.mainStyle2}>
            <AuthBottom
              navigation={navigation}
              // msgText={'New to PSP ? '}
              // navigateName={'Signup'}
              // navigatePageName={'Sign up'}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('TruckDetails')
        }>
          <Text>TruckDetails</Text>
        </TouchableOpacity>
        <ProviderBottom />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  mainStyle: {
    paddingHorizontal: moderateScale(2),
    paddingTop: moderateVerticalScale(2),
  },
  mainStyle2: {
    paddingHorizontal: moderateScale(2),
    paddingTop: moderateVerticalScale(2),
    marginTop: moderateVerticalScale(24),
  },
  forgetView: {
    alignSelf: 'flex-end',
  },
  forgetText: {
    color: color.PrimaryBlue,
    fontSize: 12,
    fontWeight: '700',
  },
})