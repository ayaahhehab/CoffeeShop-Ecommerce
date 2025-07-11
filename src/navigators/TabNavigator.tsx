import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from "../screens/FavoritesScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import CartScreen from "../screens/CartScreen";
import CustomIcon from '../components/CustomIcon';
import { COLORS } from '../theme/theme';
import {BlurView} from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarBackground: () => (
            <BlurView
              overlayColor=""
              blurAmount={10}
              style={styles.BlurViewStyles}
            />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
                <CustomIcon style={{marginBottom:-20}}
                  name="home"
                  size={25}
                  color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                  }
                />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
                <CustomIcon style={{marginBottom:-20}}
                  name="cart"
                  size={25}
                  color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                  }
                />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ focused }) => (
                <CustomIcon style={{marginBottom:-20}}
                  name="like"
                  size={25}
                  color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                  }
                />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={OrderHistoryScreen}
          options={{
            tabBarIcon: ({ focused }) => (
                <CustomIcon style={{marginBottom:-20}}
                  name="bell"
                  size={25}
                  color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                  }
                />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  
  const styles = StyleSheet.create({
    tabBarStyle: {
      height:60,
      position: 'absolute',
      borderTopWidth:0,
      backgroundColor: COLORS.primaryBlackRGBA,
      elevation: 0,
      borderTopColor: 'transparent',

    },
    BlurViewStyles: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },

  });
  export default TabNavigator;
  