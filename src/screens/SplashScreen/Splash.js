import { ActivityIndicator, Alert, BackHandler, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import AuthHeader from '../../components/AuthHeader';
import { getItem } from '../../utils/asyncStorage';
import { setAuthToken } from '../../utils/http.common';
import AppLogo from '../../components/AppLogo';
import color from '../../constants/theme';

const Splash = () => {
    const navigation = useNavigation();


    async function checkLocalAuth() {
        console.log("hello1");
        const AuthToken = await getItem('authToken');
        console.log("hello2",AuthToken);
        if(AuthToken){
            setAuthToken(AuthToken)
            // navigation.navigate('QuarryDetails')
            navigation.replace('QuarryDetails')
        } else {
            console.log("hello3",navigation);
            // navigation.navigate('DrawerNavigation')
            // navigation.navigate('IntroScreen');
            navigation.replace('IntroScreen');
            // navigation.navigate('Login');
        }
    }

    useEffect(() => {
        setTimeout(() => {
            // console.log("hello");
            // navigation.navigate('IntroScreen');
            checkLocalAuth()
        }, 2000)
    }, [])


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
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <AppLogo style={styles.img} />
                <AuthHeader />
                <ActivityIndicator size="large" color = {color.PrimaryBlue} /> 
            </View>
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'center',
    },
    img: {
        height: '60%',
        width: '100%',
        alignSelf: 'center'
    },
})