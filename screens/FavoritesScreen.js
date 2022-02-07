import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealGridTile from "../components/MealItem";

const FavoritesScreen = ({ navigation }) => {

  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  let content = <Text>What!? No favorites yet?</Text>

  if (favoriteMeals.length > 0) {
    content = <FlatList
        style={{ width: "100%" }}
        data={favoriteMeals}
        renderItem={({ item }) => (
          <MealGridTile
            item={item}
            onSelectMeal={() => {
              navigation.navigate({
                routeName: "MealDetail",
                params: {
                  item,
                  isFav: true
                },
              });
            }}
          />
        )}
      />
  }


  return (
    <View style={styles.screen}>
      {content}
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
