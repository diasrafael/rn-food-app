import React, { useCallback, useLayoutEffect } from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";

import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const MealDetailScreen = ({ navigation }) => {
  const meal = navigation.getParam("item");
  
  const isFav = useSelector((state = navigation.getParam("isFav")) =>
    state.meals.favoriteMeals.find((favMeal) => favMeal.id === meal.id)
  );

  const dispatch = useDispatch();

  const toogleFavHandler = useCallback(() => {
    dispatch(toggleFavorite(meal.id))
  }, [dispatch, meal.id]);

  useLayoutEffect(() => {
    navigation.setParams({ toggleFav: toogleFavHandler, isFav });
  }, [toogleFavHandler, isFav]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{meal.title}</Text>
          <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <DefaultText>{meal.duration}m</DefaultText>
            <DefaultText>{meal.complexity}</DefaultText>
            <DefaultText>{meal.affordability}</DefaultText>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.subtitle}>Ingredients</Text>
          </View>

          <View>
            {meal.ingredients.map((ingredient) => (
              <Text key={ingredient}>{`\u2022 ${ingredient}`}</Text>
            ))}
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.subtitle}>Steps</Text>
          </View>

          <View>
            {meal.steps.map((step) => (
              <Text key={step}>{`\u2022 ${step}`}</Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = ({ navigation }) => {
  const toggleFav = navigation.getParam("toggleFav");
  const isFav = navigation.getParam("isFav");
  return {
    headerTitle: navigation.getParam("item").title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Favorite" iconName={isFav ? "ios-star" : "ios-star-outline"} onPress={toggleFav} />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    margin: 0,
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 25,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 26,
  },
  subtitle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    paddingTop: 20,
  },
});

export default MealDetailScreen;
