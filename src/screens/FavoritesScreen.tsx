import { ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import CartItem from '../components/CartItem';
import FavoritesItemCard from '../components/FavoritesItemCard';


const FavoritesScreen = ({navigation}:any) => {
  const incrementCartItemQuantity = useStore ((state:any)=> state.incrementCartItemQuantity);
    const decrementCartItemQuantity = useStore ((state:any)=> state.decrementCartItemQuantity);
    
  const FavoritesList = useStore((state:any) => state.FavoritesList);
  const addToFavoriteList = useStore ((state:any)=> state.addToFavoriteList);
    const deleteFromFavoriteList = useStore ((state:any)=> state.deleteFromFavoriteList)
    const ToggleFavourite = (favourite : boolean, type:string, id:string) => {
      favourite ? deleteFromFavoriteList (type,id) : addToFavoriteList (type,id)
    }
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView,{marginBottom:tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Favorites List'/>
            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title ={'Cart is empty'}/>
            ) : (
            <View style={styles.ListItemContainer}>
              {FavoritesList.map((data:any) => (
                <TouchableOpacity
                key={data.id} 
                onPress={()=>{
                  navigation.push('Details',{
                    index: data.index,
                    id: data.id,
                    type:data.type
                  })
                }}>
                  <FavoritesItemCard
                  id = {data.id}
                  name = {data.name}
                  type = {data.type}
                  average_rating = {data.average_rating}
                  special_ingredient = {data.special_ingredient}
                  ingredients = {data.ingredients}
                  favourite = {data.favourite}
                  roasted = {data.roasted}
                  ratings_count = {data.ratings_count}
                  description = {data.description}
                  imagelink_portrait = {data.imagelink_portrait}
                  ToggleFavouriteItem = {ToggleFavourite}/>
                </TouchableOpacity>
              ))}
            </View>
            )} 
          </View>
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
      paddingHorizontal:5,
      gap:20
    }
})

export default FavoritesScreen;

