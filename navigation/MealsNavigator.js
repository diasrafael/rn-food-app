import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    paddingTop: 20,
    marginBottom: 10,
    height: 60,
  },
  headerTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: "white",
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  { defaultNavigationOptions }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: FavoritesScreen, navigationOptions: { title: 'Favorites'} },
    MealDetail: MealDetailScreen,
  },
  { defaultNavigationOptions }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarColor: Colors.primaryColor,
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
    },
  },
  Favorites: {
    screen: FavoritesNavigator,
    navigationOptions: {
      headerTitle: 'Olá',
      tabBarLabel: "Favs",
      tabBarColor: Colors.accentColor,
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={20} color={tabInfo.tintColor} />;
      },
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      activeColor: 'white',
      shifting: true
    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
          backgroundColor: Colors.primaryColor,
        },
    });

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, { defaultNavigationOptions })    
      
const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        title: "Meals",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans",
      },
      itemsContainerStyle: {
        paddingTop: 50
      },
    },
  }
);    

export default createAppContainer(MainNavigator);
