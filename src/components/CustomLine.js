import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import color from '../constants/theme'


const CustomLine = () => {
    return (
        <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.textStyle}>or</Text>
            <View style={styles.line} />
        </View>
    )
}

export default CustomLine;

const styles = StyleSheet.create({
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center'
    },
    textStyle: {
        fontSize: 12, 
        marginLeft: 20,
        marginRight:20, 
        fontWeight: '400', 
        color: color.Icon_Color,
    },
    line: {
        height: 0.5,
        backgroundColor: color.Icon_Color,
        flex: 1,
    }
})