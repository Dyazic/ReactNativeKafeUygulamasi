import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = useState([]);
  const baseUrl = 'http://www.kursadozdemir.com';
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(`${baseUrl}/Urun/Listele`, { "ID_URUN": route.params.pid });
        setList(response.data.NESNE);

      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const addCount = () => setCount(count + 1);
  const remoweCount = () => setCount(count - 1);

  if (count < 0) {
    setCount(0);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.90, borderRadius: 30 }}>
        {list.length > 0 ?
          <FlatList
            data={list}
            renderItem={({ item }) => (
            
                <View style={styles.itemContainer}>
                  <View>
                    <Image source={{ uri: item["GORSEL_URL"] }} style={styles.itemImage} />
                  </View>
                  <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
                    <Text style={styles.itemText}>Ürün Adı: {item["ADI"]}</Text>
                    <Text style={styles.itemText}>Açıklama: {item["ACIKLAMA"]}</Text>
                    <Text style={styles.itemText}>Fiyat: {item["FIYAT"]}</Text>
                  </View>
                </View>
          
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          : null}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={remoweCount}>
          <Text style={{ color: "#ffffff" }}>-</Text>
        </TouchableOpacity>
        
        <Text>Adet: {count}</Text>
        
        <TouchableOpacity style={styles.button} onPress={addCount}>
          <Text style={{ color: "#ffffff" }}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("HomeScreen") }}>
          <Text style={{ color: "#ffffff" }}>Ana Menü</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => {
          navigation.navigate("CartSc", { id: list[0]["ID_URUN"], piece: count, price: list[0]["FIYAT"] });
        }}>
          <Text style={{ color: "#ffffff" }}>Sepete Ekle</Text>
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
    margin:12,
  },
 
});
