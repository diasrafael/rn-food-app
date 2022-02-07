import React from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";

const findCategoryById = (catId) => CATEGORIES.find((cat) => cat.id === catId);

const CategoryMealScreen = (props) => {

  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = ({ item }) => {
    const isFav = favoriteMeals.some(fav => fav.id === item.id);
    return (
      <MealItem
        item={item}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: { item, isFav },
          });
        }}
      />
    );
  };

  const availableMeals = useSelector((state) => {
    return state.meals.filteredMeals;
  });

  const filteredMeals = availableMeals.filter((meal) =>
    meal.categoryIds.includes(props.navigation.getParam("categoryId"))
  );

  const emptyState = <View style={styles.screen}>
    <Text>No meals here. Please, check your filters...</Text>
  </View>

  return filteredMeals && filteredMeals.length > 0 ?  
    <FlatList numColumns={1} renderItem={renderMealItem} data={filteredMeals} /> : emptyState;
};

CategoryMealScreen.navigationOptions = (navigationData) => {
  const selectedCategory = findCategoryById(
    navigationData.navigation.getParam("categoryId")
  );
  return { headerTitle: selectedCategory.title };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
