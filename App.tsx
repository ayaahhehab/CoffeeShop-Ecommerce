import React from "react";
import { View,Text,StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from "./src/screens/DetailsScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import TabNavigator from "./src/navigators/TabNavigator";
import CartScreen from "./src/screens/CartScreen";



const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}/>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{animation: 'slide_from_bottom'}}/>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{animation: 'slide_from_bottom'}}/>
          <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{animation: 'slide_from_bottom'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({});

export default App;
