import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

const findCategoryById = (catId) => CATEGORIES.find((cat) => cat.id === catId);

const CategoryMealScreen = (props) => {

  const renderMealItem = ({item}) => (
    <MealItem
      item={item}
          onSelectMeal={() => {
              props.navigation.navigate({
                  routeName: "MealDetail",
                  params: { item }
              })
          }}
    />
  );

  const filteredMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(props.navigation.getParam("categoryId"))
  );

  return (
    <FlatList numColumns={1} renderItem={renderMealItem} data={filteredMeals} />
  );
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
