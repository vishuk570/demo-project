import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import color from '../constants/theme'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomBtn = ({
  btnText,
  btnStyle = {},
  onPress = () => { },
  disabled,
  iconName,
  btnTextStyle = {}
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={{ ...styles.btnStyle, ...btnStyle }}>
      <View style={styles.contentContainer}>
        {!!iconName && <Icon name={iconName} size={20} style={styles.inputIcon} />}
        {!!btnText && <Text style={{ ...styles.btnTextStyle, ...btnTextStyle }}>{btnText}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btnStyle: {
    height: 48,
    backgroundColor: color.PrimaryBlue,
    borderRadius: moderateScale(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(24),
  },
  btnTextStyle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: color.base_color,
    marginRight: moderateScale(8),
  },
  inputIcon: {
    marginRight: moderateScale(10),
    color: color.Icon_Color
  },
});