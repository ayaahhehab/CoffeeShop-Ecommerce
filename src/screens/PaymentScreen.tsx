import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY } from '../theme/theme'
import GradientBGIcon from '../components/GradientBGIcon';


const PaymentList = [
  {
    name: 'wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },

];

const PaymentScreen = () => {
  const [paymentMode, setPaymentMode] = useState('credit card')
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView 
      contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity>
            <GradientBGIcon name="left" color={COLORS.primaryLightGreyHex} size={16}/>
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView}>

          </View>
        </View>

      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow:1
  },
  HeaderContainer:{
    paddingHorizontal:24,
    paddingVertical:15,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between"
  },
  HeaderText:{
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:20,
    color:COLORS.primaryWhiteHex
  },
  EmptyView:{}

})

export default PaymentScreen;
