import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function CartScreen() {
  const [count,setCount]=useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = useState([]);
  const baseUrl = 'http://www.kursadozdemir.com';
 const [total,setTotal]=useState(0);
  const userId = route.params.tuserId;
  const userName = route.params.tuserName;
  useEffect(() => {
    const getData = async () => {
      try {
        let sum=0;
        const response = await axios.post(`${baseUrl}/Sepet/Listele`, { "ID_KULLANICI": userId });
        setList(response.data.NESNE);
        response.data.NESNE.map((item,index)=>(
          sum+=item.FIYAT*item.MIKTAR

          
        ));
        setTotal(sum)
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const calculateTotalPrice = (count, onePrice) => {
    return count * onePrice;
  };
  const addOrder = async () => {
    try {
      await axios.post(`${baseUrl}/Siparis/Ekle`, { "ID_KULLANICI": userId });
      ToastAndroid.show("Sipariş veriliyor", ToastAndroid.SHORT);
      navigation.navigate("OrderScreen", { tuserId: userId, tuserName: userName });
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Hata verdi", ToastAndroid.SHORT);
    }
  }
  const deleteObj = async (idProd) => {
    try {
      await axios.post(`${baseUrl}/Sepet/Ekle`, { "ID_URUN": idProd, "ID_KULLANICI": userId, "MIKTAR": 0 });
      ToastAndroid.show("Sepetten Çıkartılıyor", ToastAndroid.SHORT);
      setList(prevList => prevList.filter(item => item.ID_URUN !== idProd));
      
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Hata verdi", ToastAndroid.SHORT);
    }
  };
  const updateObject = async (idProd) => {
    try {
      await axios.post(`${baseUrl}/Sepet/Ekle`, { "ID_URUN": idProd, "ID_KULLANICI": userId, "MIKTAR": count });
      ToastAndroid.show("Güncelleniyor", ToastAndroid.SHORT);
     
      
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Hata verdi", ToastAndroid.SHORT);
    }
  };
  const addCount = (count1) => setCount(count + 1);
  const remoweCount = (count1) => setCount(count - 1);
  if (count < 0) {
    setCount(0);
  }
  

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ flex: 0.90, borderRadius: 30 }}>
        {list && list.length === 0 ?(
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>Sepette Ürün Yoktur</Text>
          </View>
        ):(

          <FlatList
            data={list}
            renderItem={({ item }) => (

              <View style={{flexDirection:'column'}}>
                <View style={styles.itemContainer}>
                  <View >
                    <Image source={{ uri: item["GORSEL_URL"] }} style={styles.itemImage} />
                  </View>
                  <View style={{ flexDirection: 'column', paddingLeft: 20 }}>
                    <Text style={styles.itemText}>Ürün Adı : {item["ADI"]}</Text>
                    <Text style={styles.itemText}>Ürün miktarı  : {item["MIKTAR"]}</Text>
                    <Text style={styles.itemText}>Birim Fiyat: {item["FIYAT"]}</Text>
                    <Text style={styles.itemText}>Toplam Fiyat: {calculateTotalPrice(item["MIKTAR"], item["FIYAT"])}</Text>
                     
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{width:40,height:40}} onPress={() => {
                deleteObj(item["ID_URUN"]);

        }}
                
                >
                <Image style={styles.stretch} source={require("../Assets/delete.png")} />
                
                </TouchableOpacity>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          )
          
          }
      </View>
      <View style={styles.separator} />
      <Text style={{ color: "#5D4037" }}>Toplam Sepet Tutarı : {total} </Text>
      <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 20 }}>

        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("MenuScreen", { tuserId: userId, tuserName: userName }) }}>
          <Text style={{ color: "#ffffff" }}>Alışverişe Devam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          addOrder();
        }
        }>
          <Text style={{ color: "#ffffff" }}>Siparişi Onayla</Text>
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
    padding: 10,
    height: 150,

    flex: 0.80,
    flexDirection: "row",
    justifyContent: 'space-around',
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
  },
  itemText: {
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 10,
    color: "#FFFFFF",
    fontStyle: 'italic',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  separator: {
    height: 5,
  },
  button: {
    padding: 20,
    height: 60,
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
    margin:10,
  },
  stretch: {
    width: 40,
    height: 40,
     resizeMode: 'stretch',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4037',
  },
});
