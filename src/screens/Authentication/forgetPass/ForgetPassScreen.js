import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import color from '../../../constants/theme'
import CustomText from '../../../components/CustomText';
import CustomBtn from '../../../components/CustomBtn';
import { moderateScale } from 'react-native-size-matters';
import CustomTextInput from '../../../components/CustomTextInput';

const ForgetPassScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const onBackPress = () => {
    navigation.goBack();
    return true;
  };

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={backgroundStyle}>
        <CustomBtn
          iconName='arrow-left'
          btnStyle={{
            backgroundColor: isDarkMode ? Colors.darker : '#fff',
            alignItems: 'flex-start',
            marginLeft: 20,
            marginTop: 40
          }}
          onPress={onBackPress}
        />
        <View style={styles.subContainer}>
          <CustomText
            text={'Reset password'}
            textStyle={styles.txt1}
          />
          <Text style={styles.txt2}>Enter your email and we'll send a link on your email to reset password.</Text>
          <CustomTextInput
            labelName="Email *"
            iconName="email"
            value={email}
            onChangeText={(actualData) => setEmail(actualData)}
            autoCapitalize='none'
          />
          <CustomBtn
            btnText="Send Link"
          // onPress={() => reset()}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default ForgetPassScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    height: "50%",
    marginHorizontal: 40,
    flexDirection: 'column'
  },
  txt1: {
    fontSize: 25,
    fontWeight: '800',
    marginTop: moderateScale(24)
  },
  txt2: {
    fontSize: 12,
    color: color.Icon_Color,
    marginVertical: moderateScale(15)
  }
})