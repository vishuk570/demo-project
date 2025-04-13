import { StyleSheet, View } from 'react-native'
import React from 'react'
import { moderateVerticalScale } from 'react-native-size-matters'
import CustomText from './CustomText'

const AuthHeader = () => {
    return (
        <View style = {styles.conatiner}>
            <CustomText
                text={'Stone Processing System'}
                textStyle={styles.welcome}
            />
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    conatiner: {
        marginVertical: moderateVerticalScale(40),
    },
    welcome: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '600',
    },
})