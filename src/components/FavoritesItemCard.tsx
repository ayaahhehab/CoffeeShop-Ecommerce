import { ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTFAMILY } from '../theme/theme';

interface FavoritesItemCardProps{
    id: string;
    name: string;
    type: string;
    imagelink_portrait: ImageProps;
    average_rating: number
    special_ingredient:string
    ingredients:  string
    favourite: boolean
    roasted: string
    ratings_count: string
    description: string
    ToggleFavouriteItem:any
}
const FavoritesItemCard: React.FC<FavoritesItemCardProps>  = ({
    id,
    name,
    type,
    imagelink_portrait,
    average_rating,
    special_ingredient,
    ingredients,
    favourite,
    roasted,
    ratings_count,
    description,
    ToggleFavouriteItem,

}) => {
  return (
    <View style={styles.CardContainer}>
        <ImageBackgroundInfo
        EnableBackHandler={false}
          imagelink_portrait={imagelink_portrait}
          type={type}
          id={id}
          favourite={favourite}
          roasted={roasted}
          name={name}
          average_rating={average_rating}
          special_ingredient={special_ingredient}
          ToggleFavourite={ToggleFavouriteItem}
          ingredients={ingredients}
          ratings_count={ratings_count}/>
        <LinearGradient
        start={{x:0, y:0}}
        end={{x:1, y:1}}
        style={styles.containerLinearGradient}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <Text style= {styles.DescriptionTitle}>Description</Text>
            <Text style= {styles.DescriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  )
}

export default FavoritesItemCard

const styles = StyleSheet.create({
    CardContainer:{
        borderRadius:25,
        overflow:'hidden',
    },
    containerLinearGradient:{
        gap:10,
        padding:20
    },
    DescriptionTitle:{
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:16,
        color:COLORS.primaryWhiteHex
    },
    DescriptionText:{
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:14,
        color:COLORS.primaryWhiteHex
    },
})