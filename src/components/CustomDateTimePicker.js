import React, { useState } from 'react';
import { View, Text, TextInput, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDateTimePicker = ({
  containerStyle, 
  label, 
  value, 
  isRequired,
  onChange,
  disabled = false,
  mode = 'date',
  placeholder,
  inputContainerStyle
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateConfirm = (selectedDate) => {
    if (selectedDate) {
      onChange(selectedDate.toISOString());
    }
    setShowPicker(false);
  };

  const showDateTimePicker = () => {
    console.log("hell");
    
    if (!disabled) {
      setShowPicker(true);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.requiredIndicator}> *</Text>}
        </Text>
      )}
      
      <TouchableOpacity
        style={[
          styles.inputContainer,
          inputContainerStyle,
          { backgroundColor: disabled ? theme.Background_Blue : theme.Background_White }
        ]}
        onPressIn={showDateTimePicker}
      >
        <TextInput
          style={styles.input}
          value={formatDate(value) || placeholder}
          editable={false}
          placeholder={placeholder}
          onPressIn={showDateTimePicker}
          placeholderTextColor={theme.LightGray}
        />
        <Icon 
          name={mode === 'time' ? 'clock-outline' : 'calendar-blank'} 
          size={22} 
          style={styles.icon} 
        />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode={mode}
        onConfirm={handleDateConfirm}
        onCancel={() => setShowPicker(false)}
        date={value ? new Date(value) : new Date()}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
        {...(Platform.OS === 'ios' ? {
          pickerContainerStyleIOS: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          modalPropsIOS: {
            presentationStyle: 'pageSheet'
          }
        } : {})}
      />
    </View>
  );
};


export default CustomDateTimePicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateVerticalScale(5),
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: theme.Label_txt_color,
    marginBottom: moderateVerticalScale(5),
  },
  requiredIndicator: {
    color: 'red', // Required field indicator color
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.LightGray,
    borderRadius: 5,
    paddingHorizontal: 10,
    height:45,
    backgroundColor: theme.Background_White,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.Label_txt_color,
  },
  icon: {
    color: theme.LightGray,
    marginLeft: moderateScale(10),
  },
});
