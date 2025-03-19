import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { COLORS, FONTFAMILY } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import FavoritesScreen from './FavoritesScreen';
import { Touchable } from 'react-native';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}:any) => {
  const ItemofIndex = useStore ((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const BackHandler = () => {
    navigation.pop();
  };
  const addToCarthandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
    });
    calculateCartPrice();
    navigation.push('Cart');
  };

  const addToFavoriteList = useStore ((state:any)=> state.addToFavoriteList);
  const deleteFromFavoriteList = useStore ((state:any)=> state.deleteFromFavoriteList)
  const ToggleFavourite = (favourite : boolean, type:string, id:string) => {
    favourite ? deleteFromFavoriteList (type,id) : addToFavoriteList (type,id)
  }
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const [fullDesc, setFullDesc] = useState(false);
  const [price , setPrice] = useState(ItemofIndex.prices[0]);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemofIndex.imagelink_portrait}
          type={ItemofIndex.type}
          id={ItemofIndex.id}
          favourite={ItemofIndex.favourite}
          index={ItemofIndex.index}
          roasted={ItemofIndex.roasted}
          name={ItemofIndex.name}
          average_rating={ItemofIndex.average_rating}
          special_ingredient={ItemofIndex.special_ingredient}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
          ingredients={ItemofIndex.ingredients}
          ratings_count={ItemofIndex.ratings_count}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback onPress={() => {setFullDesc(prev => !prev);}}>
              <Text style={styles.DescriptionTesxt}>
                {ItemofIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
          <TouchableWithoutFeedback onPress={() => {setFullDesc(prev => !prev);}}>
            <Text style={styles.DescriptionTesxt} numberOfLines={3}>
              {ItemofIndex.description}
            </Text>
          </TouchableWithoutFeedback>
        )}
        <Text style={styles.InfoTitle}>Size</Text>
        <View style={styles.SizeOuterContainer}>
          {ItemofIndex.prices.map((data:any)=> (
            <TouchableOpacity
            onPress={()=>{setPrice(data)}}
            key={data.size}
            style={[styles.SizeBox, {
              borderColor:data.size == price.size
               ? COLORS.primaryOrangeHex 
               : COLORS.primaryDarkGreyHex
               }]}>
              <Text style={[styles.SizeText, {
                fontSize:ItemofIndex.type=="bean"
                ? 14 : 16,
                color: data.size == price.size
               ? COLORS.primaryOrangeHex 
               : COLORS.primaryLightGreyHex

              }]}
                >{data.size}
                </Text>
            </TouchableOpacity>
          ))}

        </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCarthandler({
              id: ItemofIndex.id,
              index: ItemofIndex.index,
              name: ItemofIndex.name,
              roasted: ItemofIndex.roasted,
              imagelink_square: ItemofIndex.imagelink_square,
              special_ingredient: ItemofIndex.special_ingredient,
              type: ItemofIndex.type,
              price: price,
            });
          }}
        />
      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({
  ScreenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex:{
    flexGrow:1,
  },
  FooterInfoArea:{
    padding: 20,
  },
  InfoTitle:{
    color:'white',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize:16,
    marginBottom:10,
  },
  DescriptionTesxt:{
    color:'white',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize:14,
    marginBottom:30,
    letterSpacing:0.5
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: 24 * 2,
    borderRadius: 10,
    borderWidth: 2,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },


})

export default DetailsScreen;

