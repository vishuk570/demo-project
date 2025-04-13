import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import color from '../constants/theme'
import {Google, Microsoft} from '../assets/index'
import CustomLine from './CustomLine';
import { moderateScale } from 'react-native-size-matters';
import AuthBottomText from './AuthBottomText';

const socialLogins = [
    { name: 'Google', iconName: Google },
    { name: 'Microsoft', iconName: Microsoft },
];

const AuthBottom = ({ 
    navigation, 
    msgText, 
    navigateName, 
    navigatePageName,
}) => {

    const renderItem = (item, key) => {
        return (
            <TouchableOpacity
                key={key}
                style={styles.socialbtnStyle}
                // onPress={() => item.name == 'Google' ? googleSignIN() : outlookSignIn()}
            >
                <Image source={item.iconName} />
                <Text style={styles.socialbtnTextStyle}>{item.name}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View>
            <CustomLine/>
            <View style={styles.mainContainer}>
                {socialLogins.map((item, key) => renderItem(item, key))}
            </View>
            <AuthBottomText
                 msgText= {msgText}
                 navigation= {navigation}
                 navigateName= {navigateName} 
                 navigatePageName= {navigatePageName}
            />
        </View>
    )
}

export default AuthBottom

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: moderateScale(15),
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    socialbtnStyle: {
        width: "47%",
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 4,
        backgroundColor: "#fff"
    },
    socialbtnTextStyle: {
        fontSize: 16,
        fontWeight: '400',
        color: color.DarkGray
    }
})