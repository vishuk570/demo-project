import { StyleSheet, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CustomText = ({
    text,
    textStyle
}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Text style={[{
            color: isDarkMode ? Colors.white : Colors.black,
          },{...styles.txtStyle, ...textStyle}]}>{text}</Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    txtStyle: {
        fontSize: 12,
    }
})