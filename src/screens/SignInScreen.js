import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ToastAndroid, Keyboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function SignInScreen() {
  const navigation = useNavigation();
  const baseUrl = 'http://www.kursadozdemir.com';
  const [name, setName] = useState('');
  const [surname, setSurName] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    setName('');
    setSurName('');
  }, []);


  const addUser = async () => {
    try {
      await axios.post(`${baseUrl}/Test/Ekle`, { "AD": name, "SOYAD": surname });
      setMessage("Kullanıcı Eklendi");
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  }

  const showToast = () => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          onChangeText={setSurName}
          value={surname}
        />
        <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button} onPress={()=>{
            addUser(),
                showToast(),
                navigation.navigate("HomeScreen");
            }}>
            <Text style={{ color: "#ffffff" }}>Kullanıcı Kaydet</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7CCC8",
    alignItems: 'center',
    paddingTop: 10,
  },
  itemContainer: {
    padding: 20,
    height: 300,
    flex: 0.80,
    flexDirection: "row",
    justifyContent: 'space-around',
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
  },
  itemText: {
    paddingHorizontal: 20,
    fontSize: 20,
    marginBottom: 10,
    color: "#FFFFFF",
    fontStyle: 'italic',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  separator: {
    height: 5,
  },
  button: {
    padding: 20,
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
    margin: 12,
  },
  input: {
    height: 60,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});
