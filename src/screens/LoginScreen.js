import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LoginScreen() {
  
   const navigation=useNavigation();
  const[userId,setUserId]=useState(0);
  const[userName,setUserName]=useState('');
  const showToast = () => {
    ToastAndroid.show(userId+"."+userName+" Giriş Yapıyor", ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.textbg}>
         <Text style={{ color: "#000" }}>Kullanıcı Listesi</Text>
         </View>
         <TouchableOpacity style={styles.button} onPress={()=>{
           setUserId(1);
           setUserName("Beyza");
          
        }}>
        <Text style={{ color: "#ffffff" }}>1. Beyza</Text>
      </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={()=>{
            setUserId(2);
            setUserName("Denizhan");
            
            }}>
            <Text style={{ color: "#ffffff" }}>2. Denizhan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{
           setUserId(3);
           setUserName("Emre");
           
        }}>
        <Text style={{ color: "#ffffff" }}>3.Emre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{
           setUserId(4);
           setUserName("Furkan");
           
        }}>
        <Text style={{ color: "#ffffff" }}>4.Furkan</Text>
      </TouchableOpacity>
       <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
         <TouchableOpacity style={styles.button} onPress={()=>{
            if(userId==0){
                ToastAndroid.show("Lütfen Kullanıcı Seçin", ToastAndroid.SHORT);
            }else{
           showToast();
           navigation.navigate("HomeScreen", { tuserId:userId,tuserName:userName });
        }
        }}>
        <Text style={{ color: "#ffffff" }}>Giriş Yap</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{
           navigation.navigate("SignInScreen");
        }}>
        <Text style={{ color: "#ffffff" }}>Kullanıcı Ekle</Text>
      </TouchableOpacity>
      </View>
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
    margin: 12,
  },
  textbg:{
    padding: 15,
    borderWidth:1,
    borderColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
    margin: 12,
  }
  
});
