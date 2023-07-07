import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProductDetail from './src/screens/ProductDetail';
import SignInScreen from './src/screens/SignInScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from './src/screens/CartScreen'
import OrderScreen from './src/screens/OrderScreen';
import MenuScreen from './src/screens/MenuScreen';
const stack=createNativeStackNavigator();


function App(): JSX.Element {



  return (
    <NavigationContainer >
    
     <stack.Navigator initialRouteName='LoginScreen' screenOptions={{headerStyle:{backgroundColor:"#5D4037"}
    ,headerTitleStyle:{color:"white"}}}>
      <stack.Screen name='SignInScreen' component={SignInScreen} options={{title: 'Deniz Cafe'}}/>
     <stack.Screen name='HomeScreen' component={HomeScreen} options={{title: 'Deniz Cafe Menü'}}/>
      <stack.Screen name='ProductDetail' component={ProductDetail} options={{title:'Ürün Detayları'}}/>
      <stack.Screen name='ProductScreen' component={ProductScreen} options={{title:'Ürünler Ekranı'}}/>
      <stack.Screen name='CartScreen' component={CartScreen} options={{title:'Sepettteki Ürünler'}}/>
      <stack.Screen name='LoginScreen' component={LoginScreen} options={{title: 'Deniz Cafe'}}/>
      <stack.Screen name='OrderScreen' component={OrderScreen} options={{title:'Siparişlerim'}}/>
      <stack.Screen name='MenuScreen' component={MenuScreen} options={{title:'Menü'}}/>
      </stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 

});

export default App;
