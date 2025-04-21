import React, {useState, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import VectorIcon from '../../../assets/vectorIcons/VectorIcons';
import {moderateScale} from 'react-native-size-matters';

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <VectorIcon
          icon="AntDesign"
          name="arrowleft"
          size={moderateScale(24)}
          color="#333"
        />
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>My Settings</Text>
          <Text style={styles.headerDscText}>
            All your settings are listed here including few basic details abour
            you.
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Your Name</Text>
          <Text style={styles.ValueText}>User Name</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Your Email Address</Text>
          <Text style={styles.ValueText}>username@gmail.com</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Your Mobile</Text>
          <Text style={styles.ValueText}>8912245321</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.labelText}>Your Profile Data</Text>
          <TouchableOpacity>
            <Text style={styles.deleteAccBtn}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(12),
    backgroundColor: '#f5f5f5',
  },
  backBtn: {
    marginBottom: moderateScale(25),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: moderateScale(12),
  },
  headerContainer: {
    marginVertical: moderateScale(5),
  },
  headerText: {
    fontWeight: '600',
    fontSize: 20,
  },
  headerDscText: {
    color: 'grey',
    fontSize: 12,
    letterSpacing: 1,
    marginVertical: moderateScale(5),
  },
  detailsContainer: {
    marginTop: moderateScale(10),
  },
  labelText: {
    fontSize: 13,
    color: 'grey',
  },
  ValueText: {
    paddingTop: moderateScale(5),
    paddingBottom: moderateScale(10),
    borderBottomWidth: 1,
    borderColor: '#eee',
    fontWeight: '400',
    fontSize: 16,
  },
  deleteAccBtn: {
    paddingTop: moderateScale(6),
    paddingBottom: moderateScale(10),
    fontWeight: '400',
    fontSize: 16,
    color: 'red',
    textDecorationLine: 'underline',
  },
});
