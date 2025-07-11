import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image source={require('../assets/app_images/avatar.png')} style={styles.Image}/>
    </View>
  )
}
const styles = StyleSheet.create({
    ImageContainer:{
        height:36,
        width:36,
        borderWidth:2,
        borderRadius:12,
        borderColor:COLORS.secondaryDarkGreyHex,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
    },
    Image:{
        height:36,
        width:36,
    }
})

export default ProfilePic

