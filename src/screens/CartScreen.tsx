import { ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store'
import { COLORS } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation,rout}:any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const cartList = useStore((state:any)=> state.CartList);
  const CartPrice = useStore ((state:any)=> state.CartPrice);
  const incrementCartItemQuantity = useStore ((state:any)=> state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore ((state:any)=> state.decrementCartItemQuantity);
  const calculateCartPrice = useStore ((state:any)=> state.calculateCartPrice);
  const buttonPressHandler = ()=>{
    navigation.push("Payment");
  }
  console.log("cartList= ", cartList.length);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView,{marginBottom:tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Cart'/>
            {cartList.length == 0 ? (
              <EmptyListAnimation title ={'Cart is empty'}/>
            ) : (
            <View style={styles.ListItemContainer}>
              {cartList.map((data:any) => (
                <TouchableOpacity
                key={data.id} 
                onPress={()=>{}}>
                  <CartItem 
                  id={data.id} title={data.name} roasted={data.roasted} prices={data.prices} type={data.type} imagelink_square={data.imagelink_square} special_ingredient={data.special_ingredient} incrementCartItemQuantityHandler={()=>{}} decrementCartItemQuantityHandler={()=>{}}/>
                </TouchableOpacity>
              ))}
            </View>
            )} 
          </View>
          {cartList.length !=0 ? 
          <PaymentFooter
          buttonPressHandler={()=>{buttonPressHandler()}}
          price={{price:CartPrice,currency:"$"}}
          buttonTitle="Pay"
        
        /> : <></>}
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryBlackHex
  },
  ScrollViewFlex:{
    flexGrow:1
  },
  ScrollViewInnerView:{
    flex:1,
    justifyContent:'space-between',
  },
  ItemContainer:{
    flex:1,
  },
  ListItemContainer:{
    paddingHorizontal:20,
    gap:20
  }
})

export default CartScreen;

