import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { useNavigation ,useRoute} from "@react-navigation/native";

export default function HomeScreen() {
   const navigation=useNavigation();
   const route=useRoute();
  const userId=route.params.tuserId;
  const userName=route.params.tuserName;
  

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.textbg}>
         
         
         </View>
         <TouchableOpacity style={styles.button} onPress={()=>{
           navigation.navigate("MenuScreen", { tuserId:userId,tuserName:userName })
          
        }}>
        <Text style={{ color: "#ffffff" }}>Menüler</Text>
        <Image style={styles.stretch} source={require("../Assets/menu.png")} />
      </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={()=>{
           navigation.navigate("CartScreen", { tuserId:userId,tuserName:userName })
            
            }}>
            <Text style={{ color: "#ffffff" }}>Sepetim</Text>
            <Image style={styles.stretch} source={require("../Assets/cart.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{
        navigation.navigate("OrderScreen", { tuserId:userId,tuserName:userName })
           
        }}>
        <Text style={{ color: "#ffffff" }}>Siparişlerim</Text>
        <Image style={styles.stretch} source={require("../Assets/order.png")} />
      </TouchableOpacity>
      
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7CCC8",
    alignItems: 'center',
   // paddingTop: 10,
  },
  
  itemText: {
    paddingHorizontal: 20,
    fontSize: 20,
    marginBottom: 10,
    color: "#FFFFFF",
    fontStyle: 'italic',
  },
  
  button: {
    padding: 15,
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
  },
  textbg:{
    padding: 15,
    
    borderColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
    margin: 12,
  },
  stretch: {
    width: 100,
    height: 100,
     resizeMode: 'stretch',
  },
  
});
