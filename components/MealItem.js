import react from "react";
import {
  TouchableNativeFeedback,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from "react-native";

import DefaultText from "./DefaultText";

const MealGridTile = ({ item, onSelectMeal }) => {
  return (
    <View style={styles.screen}>
      <TouchableNativeFeedback onPress={onSelectMeal}>
        <View style={styles.mealCard}>
          <ImageBackground source={{ uri: item.imageUrl }} style={styles.image}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </ImageBackground>
          <View style={styles.details}>
            <DefaultText>{item.duration}m</DefaultText>
            <DefaultText>{item.complexity}</DefaultText>
            <DefaultText>{item.affordability}</DefaultText>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    paddingVertical: 10,
    fontSize: 18,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
      padding: 10,
    
  },
  details: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  mealCard: {
    borderRadius: 5,
    elevation: 4,
    backgroundColor: "lightgray",
    padding: 20,
  },
});

export default MealGridTile;
