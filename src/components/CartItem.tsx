import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLORS } from '../theme/theme';


interface CartItemProps {
    id: string;
    title: string;
    roasted: string;
    prices: any;
    type: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    incrementCartItemQuantityHandler: any;
    decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({id,
    title,
    roasted,
    prices,
    type,
    imagelink_square,
    special_ingredient,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,}) => {
  return (
    <View>
      {prices.length !=1 ?
      <LinearGradient
      start={{x:0,y:0}}
      end={{x:1,y:1}}
      colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}
      style={styles.CartItemLinearGradient}>
        <View>
            <Image source={imagelink_square} style={styles.CartItemImage}/>
        </View>
      </LinearGradient> : 
      <LinearGradient
      start={{x:0,y:0}}
      end={{x:1,y:1}}
      colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}
      style={styles.CartItemLinearGradient}>
        <View>
            <Image source={imagelink_square} style={styles.CartItemImage}/>
        </View>
      </LinearGradient>}
    </View>
  )
}
const styles = StyleSheet.create({
    CartItemImage:{
        height:130,
        width:130
    },
    CartItemLinearGradient:{
      
    }
})
export default CartItem

