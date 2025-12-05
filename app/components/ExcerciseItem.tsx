import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Item from "../types/Item";

type ExcerciseItemProps = {
  item: Item;
  setItemDone: (index: number) => void;
  index: number;
};

export default function ExcerciesItem({ item, setItemDone, index }: ExcerciseItemProps) {
  const currStyle = item.isDone ? styles.done : styles.undone;

  return (
    <>
      <TouchableOpacity style={[styles.container, currStyle]} onPress={() => setItemDone(index)}>
        <Text>
          {item.isDone && "✅"} {item.name}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  done: {
    backgroundColor: "#00c24eff",
    textDecorationLine: "line-through",
  },
  undone: {
    backgroundColor: "#cc0202ff",
    color: "white",
  },
});
