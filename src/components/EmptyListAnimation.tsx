import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { FONTFAMILY } from '../theme/theme';


interface EmptyListAnimationProps {
    title: string;
}

const EmptyListAnimation: React.FC<EmptyListAnimationProps> = ({title}) => {
  return (
    <View style={styles.EmptyContainer}>
        <LottieView
        style={styles.LottieStyle} 
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop/>
        <Text style={styles.LottieText}>{title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    EmptyContainer:{
        flex:1,
        justifyContent:'center'
    },
    LottieStyle:{
        height:300
    },
    LottieText:{
        fontSize:16,
        color:"orange",
        textAlign:'center',
        fontFamily:FONTFAMILY.poppins_medium
    }
})
export default EmptyListAnimation

