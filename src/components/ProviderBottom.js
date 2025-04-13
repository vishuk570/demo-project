import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppLogo from './AppLogo'
import CustomText from './CustomText'
import { moderateVerticalScale } from 'react-native-size-matters'

const ProviderBottom = () => {
    return (
        <View style={styles.powered}>
            <CustomText
                text={'Powered by '}
                textStyle={{ fontSize: 12 }}
            />
            <CustomText
                text={'SPS'}
                textStyle={{ fontSize: 12, fontWeight:'700' }}
            />
            {/* <AppLogo style={styles.img} /> */}
        </View>
    )
}

export default ProviderBottom

const styles = StyleSheet.create({
    img: {
        width: 42,
        height: 16,
        marginTop: 2
    },
    powered: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: moderateVerticalScale(20),
        alignItems:'flex-end',
        flex:1
    },
})