import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import color from '../constants/theme'
import CustomText from './CustomText'

const AuthBottomText = ({ 
    msgText ,
    navigation, 
    navigateName, 
    navigatePageName,
}) => {
    return (
        <View style={styles.bottomView}>
            <CustomText
                text={msgText}
                textStyle={styles.bottomText}
            />
            <TouchableOpacity>
                <Text style={styles.bottomBtnTxt} onPress={() =>{
                    navigation.navigate(navigateName)
                }
                    
                }>{navigatePageName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthBottomText

const styles = StyleSheet.create({
    bottomView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: moderateVerticalScale(50),
        marginBottom: moderateVerticalScale(16),
        marginTop: moderateScale(16),
        width:moderateScale(200),
        height:moderateVerticalScale(38),
        alignItems:'center',
        alignSelf:'center'
    },
    bottomText: {
        fontWeight: "400",
        fontSize: 12,
    },
    bottomBtnTxt: {
        fontWeight: '700',
        fontSize: 12,
        color: color.PrimaryBlue
    }
})