import { StyleSheet,Image } from 'react-native'
import React from 'react'

const AppLogo = ({
    ...props
}) => {
  return (
    <>
    <Image {...props} source={require('../assets/Images/AppBanner.jpg')}/>
    </>
  )
}

export default AppLogo;

const styles = StyleSheet.create({})