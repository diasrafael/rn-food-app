import React from "react";
import { TouchableNativeFeedback, View, Text, StyleSheet } from "react-native";

const CategoryGridTile = (props) => {
  return (
    <View style={styles.gridItem}>
      <TouchableNativeFeedback style={{ flex: 1 }} onPress={props.onPress}>
        <View
          style={{ ...styles.container, backgroundColor: props.item.color }}
        >
          <Text numberOfLines={2} style={styles.title}>
            {props.item.title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 10,
    elevation: 4,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
});

export default CategoryGridTile;
