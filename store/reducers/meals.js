import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE } from "../actions/meals";
import { UPDATE_FILTERS } from "../actions/filters";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );

      if (existingIndex >= 0) {        
        const updatedFavs = [...state.favoriteMeals];
        updatedFavs.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavs,
        };
      } else {
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(
            state.meals.find((meal) => meal.id === action.mealId)
          ),
        };
      }

    case UPDATE_FILTERS:

      const filteredMeals = state.meals.filter((meal) => {
        if (action.filters.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }

        if (action.filters.isLactoseFree && !meal.isLactoseFree) {
          return false;
        }

        if (action.filters.isVegan && !meal.isVegan) {
          return false;
        }

        if (action.filters.isGlutenFree && !meal.isVegeterian) {
          return false;
        }

        return true;
      });

      return { ...state, filteredMeals}

    default:
      return state;
  }
};

export default mealsReducer;
