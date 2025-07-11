import { Dimensions,ImageBackground, ImageProps, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, FONTFAMILY } from '../theme/theme'
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';


const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
    id: string,
    index: number,
    type: string,
    roasted: string,
    price: any,
    name:string,
    average_rating:number,
    imagelink_square: ImageProps,
    special_ingredient: string,
    buttonPressHandler: any,
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
    id,
    index,
    type,
    roasted,
    price,
    name,
    average_rating,
    imagelink_square,
    special_ingredient,
    buttonPressHandler,
}) => {
  return (
    <LinearGradient
    style={styles.CardLinearGradientContainer}
    start={{x:0,y:0}}
    end={{x:1,y:1}}
    colors={[COLORS.primaryLightGreyHex,COLORS.primaryBlackHex]}>
        <ImageBackground 
        style={styles.CardImageBG}
        source={imagelink_square}
        resizeMode='cover'>
            <View style={styles.CardRatingComponent}>
                <CustomIcon name='star' color={COLORS.primaryOrangeHex} size={16}/>
                <Text style={styles.CardRatingText}>{average_rating}</Text>
            </View>
        </ImageBackground>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardSubTitle}>{special_ingredient}</Text>
        <View style={styles.CardFooter}>
            <Text style={styles.cardPrice}>$
                <Text style={styles.Price}> {price.price}</Text></Text>
            <TouchableOpacity onPress={() => {buttonPressHandler({id,index,type,roasted,imagelink_square,name,special_ingredient,prices: [{...price, quantity:1}],})
        }}>
                <BGIcon name={'add'} color={'white'} size={10} BGColor={'orange'}/>
            </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    CardLinearGradientContainer:{
        borderRadius:20,
        padding: 15
    },
    CardImageBG:{
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: 20,
        overflow:'hidden'
    },
    CardRatingComponent:{
        flexDirection:'row',
        backgroundColor:COLORS.primaryBlackRGBA,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        borderBottomLeftRadius:20,
        borderTopRightRadius:20,
        right:0,
        gap:10,
        paddingHorizontal:15
    },
    CardRatingText:{
        color:'white',
        fontSize:14,
        lineHeight:22,
        fontWeight:'800'
    },
    cardTitle:{
        fontFamily:FONTFAMILY.poppins_medium,
        color:'white',
        fontSize:16,
        marginTop:10
    },
    cardSubTitle:{
        fontFamily:FONTFAMILY.poppins_light,
        color:'white',
        fontSize:12,
    },
    cardPrice:{
        fontFamily:FONTFAMILY.poppins_medium,
        color:'orange',
        fontSize:18,
        lineHeight:22
    },
    Price:{
        fontFamily:FONTFAMILY.poppins_semibold,
        color:'white',
    },
    CardFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15
    }
})

export default CoffeeCard

