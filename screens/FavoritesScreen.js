import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { MEALS } from "../data/dummy-data";
import MealGridTile from "../components/MealItem";

const FavoritesScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <FlatList
        style={{width: '100%'}}
        data={MEALS}
        renderItem={({ item }) => (
          <MealGridTile
            item={item}
                onSelectMeal={() => {
              navigation.navigate({
                routeName: "MealDetail",
                params: {
                  item,
                },
              });
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
