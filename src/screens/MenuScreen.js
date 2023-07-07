import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import axios from "axios";

export default function MenuScreen() {
  const navigation = useNavigation();
  const route=useRoute();
  const [list, setList] = useState([]);
  const baseUrl = 'http://www.kursadozdemir.com';

  const userId=route.params.tuserId;
  const userName=route.params.tuserName;
  useEffect(() => {
   
   
    const getData = async () => {
      try {

        const response = await axios.post(`${baseUrl}/Kategori/Listele`, {});
        setList(response.data.NESNE);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {list.length > 0 ?
        <FlatList
data={list}
 renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => {navigation.navigate("ProductScreen",{catId:item["ID_KATEGORI"], tuserId:userId,tuserName:userName }) }}>
             
                <Image source={{ uri: item["GORSEL_URL"] }} style={styles.itemImage} />
                <Text style={styles.itemText}>    {item["ADI"]}</Text>
             </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        : null}
        <TouchableOpacity style={styles.itemContainer} onPress={()=>{
          navigation.navigate("CartScreen",{tuserId:userId});
        }}
        > 
        <Image style={styles.stretch} source={require("../Assets/cart.png")} />
          <Text style={{color:"#fff"}}>Sepeteim</Text>
          </TouchableOpacity>
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
    height: 100,
    flex: 0.80,
    flexDirection: "row",
    justifyContent: 'space-around',
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
  },
  itemText: {
    paddingHorizontal: 5,
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
  stretch: {
    width: 60,
    height: 60,
     resizeMode: 'stretch',
  },
});
