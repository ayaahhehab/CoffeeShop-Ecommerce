import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface GradientBGIconProps {
    name: string;
    color: string;
    size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({name, color, size}) => {
  return (
    <View style={styles.Container}>
        <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.LinearGradientBG}>
            <CustomIcon name={name} color={color} size={size}/>
        </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    Container:{
        borderWidth:2,
        borderColor:COLORS.secondaryDarkGreyHex,
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:COLORS.secondaryDarkGreyHex,
        overflow:'hidden',

    },
    LinearGradientBG:{
        height:36,
        width:36,
        alignItems:'center',
        justifyContent:'center'

    }
})

export default GradientBGIcon

