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
  const userId = route.params.tuserId;
  const userName = route.params.tuserName;
  const pId = route.params.pid;
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
  const addCart = async () => {
    try {
      const response = await axios.post(`${baseUrl}/Sepet/Ekle`, { "ID_URUN": route.params.pid, "ID_KULLANICI": userId, "MIKTAR": count });
      // Ekleme işlemi başarılı olduğunda yapılması gereken işlemler...
      navigation.navigate("CartScreen",{ tuserId:userId,tuserName:userName })
      console.log("count",count);
    } catch (error) {
      console.log(error);

    }
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
      <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',margin:10 }}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("MenuScreen",{ tuserId:userId,tuserName:userName }) }}>
          <Image style={styles.stretch} source={require("../Assets/menu.png")} />
          <Text style={{ color: "#ffffff" }}>Ana Menü</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          addCart();

        }}>
          <Image style={styles.stretch} source={require("../Assets/addcart.png")} />
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
    height: 200,
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
    width: 100,
    height: 100,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  separator: {
    height: 5,
  },
  button: {
    padding: 15,
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
    margin: 12,
  },
  stretch: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },

});
