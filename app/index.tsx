import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ExcerciesItem from "./components/ExcerciseItem";
import Item from "./types/Item";

export default function Index() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemName, setItemName] = useState("");

  const itemsDoneCount = items.filter((item) => item.isDone).length;

  const getNextId = () => {
    if (items.length == 0) return "1";

    const lastId = items.sort((a, b) => parseInt(b.id) - parseInt(a.id))[0].id;

    return (parseInt(lastId) + 1).toString();
  };

  const addNewItem = () => {
    if (itemName.trim() == "") {
      return alert("Adj meg gyakorlat nevet.");
    }

    const nextId = getNextId();
    const newItem: Item = { id: nextId, name: itemName, isDone: false };
    let newList = [...items, newItem];
    setItems(newList.sort((a, b) => Number(a.isDone) - Number(b.isDone)));

    setItemName("");
  };

  const setItemDone = (index: number) => {
    if (!items[index]) return;

    let itemsCpy = [...items];
    itemsCpy[index].isDone = true;

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

      <FlatList data={items} renderItem={({ item, index }) => <ExcerciesItem item={item} index={index} setItemDone={setItemDone}></ExcerciesItem>} keyExtractor={(item) => item.id}></FlatList>
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
  },
  inputGroup: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
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
});
