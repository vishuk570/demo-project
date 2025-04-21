import { StyleSheet, View, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ProviderBottom from '../../../components/ProviderBottom';
import AuthBottom from '../../../components/AuthBottom';
import CustomBtn from '../../../components/CustomBtn';
import CustomTextInput from '../../../components/CustomTextInput';
import AuthHeader from '../../../components/AuthHeader';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import color from '../../../constants/theme';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : "#fff",
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.mainContainer}>
          <View style={styles.mainStyle}>
            <AuthHeader />
            <View >
              <CustomTextInput
                labelName='Name *'
                value={name}
                onChangeText={(actualData) => setName(actualData)}
              />
              <CustomTextInput
                labelName='email *'
                value={email}
                onChangeText={(actualData) => setEmail(actualData)}
                autoCapitalize='none'
              />
              <CustomTextInput
                labelName='Password *'
                secureTextEntry={true}
                value={password}
                onChangeText={(actualData) => setPassword(actualData)}
              />
              <TouchableOpacity
                style={styles.forgetView}
                onPress={() => navigation.navigate('ForgetPass')}
              >
              </TouchableOpacity>
              <CustomBtn
                btnText="Sign up"
              // onPress={() => submit()}
              />
            </View>
          </View>
          <View style={styles.mainStyle2}>
            <AuthBottom
              navigation={navigation}
              msgText={'Already have an account? '}
              navigateName={'Login'}
              navigatePageName={'Sign in'}
            />
          </View>
        </View>
        <ProviderBottom />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SignupScreen

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