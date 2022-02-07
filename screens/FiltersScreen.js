import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Colors";
import CustomHeaderButton from "../components/CustomHeaderButton";
import DefaulText from "../components/DefaultText";
import { useDispatch } from "react-redux";
import { updateFilters as updateFiltersAction } from "../store/actions/filters";

const CustomSwitch = (props) => {
  return (
    <View style={styles.switchRow}>
      <DefaulText>{props.label}</DefaulText>
      <Switch
        trackColor={{
          true: Colors.primaryColor,
          false: 'lightgrey'
        }}
        thumbColor={Colors.accentColor}
        value={props.value}
        onValueChange={props.onValueChange}
      />
    </View>
  );
};

const FiltersScreen = ({ navigation }) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);

  const dispatch = useDispatch();

  const updateFilters = useCallback(
    () =>
      dispatch(
        updateFiltersAction({
          isGlutenFree,
          isLactoseFree,
          isVegan,
          isVegeterian,
        })
      ),
    [isGlutenFree, isLactoseFree, isVegan, isVegeterian]
  );

  useEffect(
    () => navigation.setParams({ updateFilters }),
    [updateFilters]
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Customize your meals</Text>
      <CustomSwitch
        label="Gluten-free"
        value={isGlutenFree}
        onValueChange={(newValue) => setIsGlutenFree(newValue)}
      />
      <CustomSwitch
        label="Lactose-free"
        value={isLactoseFree}
        onValueChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <CustomSwitch
        label="Vegan"
        value={isVegan}
        onValueChange={(newValue) => setIsVegan(newValue)}
      />
      <CustomSwitch
        label="Vegeterian"
        value={isVegeterian}
        onValueChange={(newValue) => setIsVegeterian(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = ({ navigation }) => {
  const updateFilters = navigation.getParam("updateFilters");

  return {
    headerTitle: "Filter Meals",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-save"
          onPress={() => {
            updateFilters();
            navigation.navigate("Categories")
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    paddingBottom: 20,
  },
  switchRow: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default FiltersScreen;
