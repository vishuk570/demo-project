import React, {useState} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import {
    moderateVerticalScale,
} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../constants/theme'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const CustomTextInput = ({
    labelName,
    placeholder,
    iconName,
    value,
    inputStyle = {},
    txtStyle = {},
    rightIcon,
    onPressRight,
    secureTextEntry,
    onChangeText = () => { },
    ...props
}) => {
    const [secure, setSecure] = useState(secureTextEntry);

    const toggleSecureEntry = () => {
        setSecure(!secure);
    };
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <Text style={[styles.placeholderText, {backgroundColor: isDarkMode ? Colors.darker : Colors.white }]}>{labelName}</Text>
                <TextInput
                    style={{...styles.input, ...txtStyle}}
                    placeholder=""
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secure}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={toggleSecureEntry} >
                        <Icon name={secure ? 'eye-off' : 'eye'} size={24} color="gray" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical:moderateVerticalScale(10),
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: color.Icon_Color,
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeholderText: {
        position: 'absolute',
        top: -10,
        left: 10,
        paddingHorizontal: 5,
        fontSize: 12,
        color: color.Icon_Color,
    },
    input: {
        flex: 1,
        height:43,
        color: color.DarkGray
    },
});

export default CustomTextInput;