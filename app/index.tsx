import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ExcerciesItem from "./components/ExcerciseItem";
import { Item } from "./types/Item";

export default function Index() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");

  // Nem kell state legyen, mert re-render után megváltozik az értéke
  const itemsDoneCount = items.filter((item) => item.isDone).length;

  const addNewItem = () => {
    if (itemName.trim().length == 0) {
      return alert("Adj meg gyakorlat nevet.");
    }

    // Elmentem a következő ID-t változóba, ez a lista hossz + 1.
    const nextId = items.length < 1 ? "1" : (items.length + 1).toString();
    const newItem: Item = { id: nextId, name: itemName, isDone: false };
    // Lemásolom az "items" listát, és az új itemet berakom a végére.
    let newList = [...items, newItem];
    // Beállitom az items state-et, a isDone alapján sorrendbe
    // true = 1, false = 0 ezért ki lehet vonni egymásból a comparator-ben
    // Number() typescript metódusa, átkonvertálja számmá, ezért nem fog hibát dobni ha ki akarjuk vonni egymásból
    setItems(newList.sort((a, b) => Number(a.isDone) - Number(b.isDone)));

    // Törlöm az input mező tartalmát
    setItemName("");
  };

  const setItemDone = (index: number) => {
    // Ha nem létezik az item, visszatérek
    if (!items[index]) return;

    // Lemásolom a listát, és átírom a megfelelő elemének az isDone property-jét.
    let itemsCpy = [...items];
    itemsCpy[index].isDone = true;

    // Sort ugyan úgy, mint új elem hozzáadásakor.
    setItems(itemsCpy.sort((a, b) => Number(a.isDone) - Number(b.isDone)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Edzésprogram</Text>
      <View style={styles.inputGroup}>
        <Text>Gyakorlat</Text>
        <TextInput placeholderTextColor="#5a626dff" placeholder="Fekvőtámasz 3x10" value={itemName} onChangeText={(text) => setItemName(text)} style={styles.textInput}></TextInput>
        <TouchableOpacity onPress={addNewItem} style={styles.button}>
          <Text>Hozzáad</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setItems([])} style={[styles.button, { backgroundColor: "#cc0202ff" }]}>
          <Text>Lista üritése</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 24 }}>
        <Text style={{ fontWeight: "bold", marginRight: 5 }}>
          {itemsDoneCount}/{items.length}
        </Text>
        gyakorlat kész
      </Text>

      <View style={styles.container}>{items.length > 0 ? <FlatList style={styles.flatList} data={items} renderItem={({ item, index }) => <ExcerciesItem item={item} index={index} setItemDone={setItemDone}></ExcerciesItem>} keyExtractor={(item) => item.id}></FlatList> : <Text style={styles.container}>Nincs megjelníthető gyakorlat.</Text>}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  inputGroup: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    maxHeight: 150
  },
  textInput: {
    backgroundColor: "#a8a8a8ff",
    padding: 2,
    maxHeight: 20,
    borderRadius: 10,
    paddingLeft: 5,
  },
  button: {
    paddingHorizontal: 10,
    backgroundColor: "#328bff",
    maxHeight: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    minWidth: 150,
  },
  flatList: {
    paddingHorizontal: 10,
  }
});
