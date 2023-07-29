import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootStack from "./src/navigators/RootStack";
import { Provider } from "react-redux";
import store from "./src/_actions/store";
import { setAuth } from "./src/util/setAuth";
import { setUser, Logout } from "./src/_actions/logicHandlerActions/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import Toast from "react-native-toast-message";
import React from "react";

export default function App() {
  AsyncStorage.getItem("jwt").then((token) => {
    if (token) {
      const decode = jwt_decode(token);
      store.dispatch(setUser(decode));
      setAuth(token);
      const currentDate = Date.now() / 1000;
      if (decode.exp < currentDate) {
        store.dispatch(Logout());
      }
    }
  });
  return (
    <Provider store={store}>
      <RootStack />
      <StatusBar style="light" />
      <Toast />
    </Provider>
  );
}
