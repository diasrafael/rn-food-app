import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import MealsNavigator from "./navigation/MealsNavigator";
import mealsReducer from "./store/reducers/meals";

import { LogBox } from "react-native";

//Ignore warning regarding old versions of React Navigation lib
LogBox.ignoreLogs(["It appears"]);

const rootReducer = combineReducers({ meals: mealsReducer });
const store = createStore(rootReducer);

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}
