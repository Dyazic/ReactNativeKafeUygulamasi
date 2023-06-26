import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation,useRoute  } from "@react-navigation/native";
import axios from "axios";
export default ProductScreen=()=>{
  const navigation = useNavigation();
  const route=useRoute();
  
  
  const [list, setList] = useState([]);
  const baseUrl = 'http://www.kursadozdemir.com';
 

  

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(route.params.catId);
        const response = await axios.post(`${baseUrl}/Urun/Listele`, { "ID_KATEGORI": route.params.catId});
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
            <TouchableOpacity onPress={() => { { navigation.navigate("ProductDet", { pid: item.ID_URUN }) }}}>
              <View style={styles.itemContainer}>
                <View >
                <Image source={{ uri: item["GORSEL_URL"] }} style={styles.itemImage} />
                </View>
                 <View style={{flexDirection:'column',paddingLeft:20}}>
                <Text style={styles.itemText}>Tipi : {item["ADI"]}</Text>
                <Text style={styles.itemText}>Açıklama: {item["ACIKLAMA"]}</Text>
                <Text style={styles.itemText}>Fiyat: {item["FIYAT"]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        : null}
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
   // height: 100,
    flex: 1,
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
    lineHeight: 24, // Satır yüksekliği
     
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
});
