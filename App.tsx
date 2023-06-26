import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProductDetail from './src/screens/ProductDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from './src/screens/CartScreen'
const stack=createNativeStackNavigator();


function App(): JSX.Element {



  return (
    <NavigationContainer >
    
     <stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerStyle:{backgroundColor:"#5D4037"}
    ,headerTitleStyle:{color:"white"}}}>
     <stack.Screen name='HomeScreen' component={HomeScreen} options={{title: 'Deniz Cafe Menü'}}/>
      <stack.Screen name='ProductDet' component={ProductDetail} options={{title:'Ürün Detayları'}}/>
      <stack.Screen name='ProductSc' component={ProductScreen} options={{title:'Ürünler Ekranı'}}/>
      <stack.Screen name='CartSc' component={CartScreen} options={{title:'Sepettteki Ürünler'}}/>
      </stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
 

});

export default App;
