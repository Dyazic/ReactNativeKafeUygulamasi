import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation ,useRoute} from "@react-navigation/native";
import axios from "axios";

export default function OrderScreen() {
  const navigation = useNavigation();
  const route=useRoute();
  const [list, setList] = useState([]);
  const baseUrl = 'http://www.kursadozdemir.com';
  const userId=route.params.tuserId;
  const userName=route.params.tuserName;
   useEffect(() => {
    const getData = async () => {
      try {
       const response = await axios.post(`${baseUrl}/Siparis/Listele`, { "ID_KULLANICI": userId});
       setList(response.data.NESNE);
       
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
 
  


  return (
    <SafeAreaView style={styles.container}>
     
      <View style={{ flex: 0.90, borderRadius: 30 }}>
        {list.length > 0 ?
          <FlatList
            data={list}
            renderItem={({ item }) => (
              
              <View style={{flexDirection:'column',borderWidth:2,borderColor:"#5D4037", borderRadius:25}}>
              <Text style={styles.itemText}>Sipariş no :{ item["ID_SIPARIS"]}</Text>
              <Text style={styles.itemText}>Sipariş Tarihi : {item["KAYIT_TARIHI"]}</Text>
                <View style={styles.itemContainer}>
                  
                <View >
                <Image source={{ uri: item["GORSEL_URL"] }} style={styles.itemImage} />
                </View>
                 <View style={{flexDirection:'column',paddingLeft:20}}>
                 <Text style={styles.itemText}>Ürün Adı : {item["ADI"]}</Text>

                <Text style={styles.itemText}>Ürün miktarı  : {item["MIKTAR"]}</Text>
                <Text style={styles.itemText}>Birim Fiyat: {item["BIRIM_FIYAT"]}</Text>
                <Text style={styles.itemText}>Toplam Fiyat: {item["TOPLAM_FIYAT"]}</Text>
                
                </View>
              </View>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
          : null}
          
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
    height: 130,
   
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
    height:60,
    backgroundColor: "#5D4037",
    alignItems: "center",
    borderRadius: 20,
  }
});
