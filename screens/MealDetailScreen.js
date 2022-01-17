import React from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

import DefaultText from "../components/DefaultText";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const MealDetailScreen = ({ navigation }) => {
  const meal = navigation.getParam("item");

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
  return {
    headerTitle: navigation.getParam("item").title,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => console.log("clicked!")}
        />
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
