import { Animated, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ScreenContainer } from 'react-native-screens';
import { COLORS, FONTFAMILY } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';


const getCategoriesFromData = (data:any) => {
  let temp: any = {};
  for (let i = 0; i <data.length; i++){
    if (temp[data[i].name] == undefined){
      temp [data[i].name] = 1;
    }else{
      temp [data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data:any) => {
  if (category == 'All'){
    return data;
  }else{
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
}


const HomeScreen = ({navigation}:any) => {
  const CoffeeList = useStore((state:any) => state.CoffeeList);
  const BeanList = useStore((state:any) => state.BeanList);
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setcategoryIndex] = useState({
    index:0,
    category: categories[0],
  });
  const [sortedCoffee, setsortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));
  const tabBarHeight = useBottomTabBarHeight();
  const ListRef:any = useRef<FlatList>();
  const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  // Function to handle search
  React.useEffect(() => {
    const filteredCoffee = CoffeeList.filter((item: any) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setsortedCoffee(filteredCoffee);
  }, [searchText, CoffeeList]);

  const handleSearch = () => {
    // const filteredCoffee = CoffeeList.filter((item: any) =>
    //   item.name.toLowerCase().includes(searchText.toLowerCase())
    // );
    // setsortedCoffee(filteredCoffee);
  };


  const CoffeeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${name} is Added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER)
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.ScreenTitle}>Find the best {'\n'}coffee for you </Text>
        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={handleSearch}>
            <CustomIcon
            name='search'
            size={18}
            color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            style={styles.InputIcon}
            />
          </TouchableOpacity>
          <TextInput
          placeholder='Find your coffee...'
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}/>
          {searchText.length > 0 ?(
            <TouchableOpacity onPress={() => setSearchText('')}>
              <CustomIcon name='close' color={'gray'} size={10} style={styles.InputIcon}/>
            </TouchableOpacity>
          ):(
            <></>
          )}
        </View>

        {/* Category scroller */}
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.CategoryScrollerViewStyle}>
          {categories.map((data,index) => (
            <View key={index.toString()} style={styles.CategoryScrollerViewContainer}>
              <TouchableOpacity style={styles.CategoryScrollerViewItem}
              onPress={()=>{
                ListRef?.current?.scrollToOffset({
                  Animated:true,
                  offset:0,
                })
                setcategoryIndex({index:index, category:categories[index]}),
                setsortedCoffee([...getCoffeeList(categories[index], CoffeeList)])
              }}>
                <Text style={[styles.CategoryText,
                  categoryIndex.index == index ? {color:COLORS.primaryOrangeHex} : {},]}>
                  {data}
                </Text>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory}/>
                ):(
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* Cofee Cards */}
        <FlatList
        ref={ListRef}
        horizontal
        ListEmptyComponent={
          <View>
            <Text style={styles.CategoryText}> No Coffee Available </Text>
          </View>
        }
        showsHorizontalScrollIndicator={false}
        data={sortedCoffee}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return(
          <TouchableOpacity onPress={() => {
            navigation.push('Details', {
            index:item.index,
            id:item.id,
            type:item.type
          })
          }}>
            <CoffeeCard
            id={item.id}
            index={item.index}
            type={item.type}
            roasted={item.rosted}
            price={item.prices[2]}
            name={item.name}
            average_rating={item.average_rating}
            imagelink_square={item.imagelink_square}
            special_ingredient={item.special_ingredient}
            buttonPressHandler={CoffeeCardAddToCart}
            />
          </TouchableOpacity>
          );
        }}
        />
        {/* Beans FlatList */}
        <Text style={styles.BeansTitle}>Coffe Beans</Text>
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={BeanList}
        contentContainerStyle={[styles.FlatListContainer, {marginBottom:tabBarHeight}]}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return(
            <TouchableOpacity onPress={() => {
              navigation.push('Details', {
              index:item.index,
              id:item.id,
              type:item.type
            })
            }}>
            <CoffeeCard
            id={item.id}
            index={item.index}
            type={item.type}
            roasted={item.rosted}
            price={item.prices[2]}
            name={item.name}
            average_rating={item.average_rating}
            imagelink_square={item.imagelink_square}
            special_ingredient={item.special_ingredient}
            buttonPressHandler={CoffeeCardAddToCart}
            />
          </TouchableOpacity>
          );
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
  ScreenTitle:{
    color: COLORS.primaryWhiteHex,
    fontFamily:FONTFAMILY.poppins_semibold,
    fontSize:28,
    paddingLeft:30
  },
  InputContainerComponent:{
    flexDirection:'row',
    margin: 30,
    borderRadius:20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems:'center'
  },
  InputIcon:{
    marginHorizontal:20
  },
  TextInputContainer:{
    flex:1,
    color:'white',
    height:50
  },
  CategoryScrollerViewContainer:{
    paddingHorizontal:15,
  },
  CategoryScrollerViewStyle:{ 
    marginBottom:20,
    paddingHorizontal:20
  },
  
  CategoryText:{
    color:COLORS.primaryLightGreyHex,
    marginBottom:4,
    fontSize:16,
    fontFamily:FONTFAMILY.poppins_semibold
  },
  CategoryScrollerViewItem:{
    alignItems:'center'
  },
  ActiveCategory:{
    height:10,
    width:10,
    borderRadius:10,
    backgroundColor:COLORS.primaryOrangeHex
  },
  FlatListContainer:{
    gap:20,
    paddingHorizontal:20,
    paddingVertical:20,
  },
  BeansTitle:{
    paddingLeft:30,
    color:'white',
    fontSize:18,
    fontFamily:FONTFAMILY.poppins_medium,
    marginTop:20
  }
})

export default HomeScreen;

