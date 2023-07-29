import React from "react";
//!Importing all the screens in our project
import Login from "./../screens/Login";
import Signup from "./../screens/Signup";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";

//!import of expo and react native modules
import { colors } from "../components/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//!Redux modules import
import { useSelector } from "react-redux";
import Home from "../screens/DashboardScreens/Home";
import Orders from "../screens/DashboardScreens/Orders";
import Settings from "../screens/DashboardScreens/Settings";
import Main from "../screens/DashboardScreens/Main";

const Stack = createStackNavigator();
const { white, black, primary, lightblack } = colors;

const RootStack = () => {
  const isConnected = useSelector((state) => state.auth.isConnected);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Main"}
        screenOptions={{
          headerLeft: (props) => (
            <Pressable
              {...props}
              className="w-10 h-10 bg-primary flex-row justify-center items-center ml-4"
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={25}
                color="white"
              />
            </Pressable>
          ),
          cardStyle: {
            backgroundColor: lightblack,
          },
          headerTintColor: black,
          headerStyle: {
            backgroundColor: lightblack,
            shadowColor: "transparent",
            height: 100,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle: {
            paddingRight: 25,
          },
          animationEnabled: false,
        }}
      >
        {isConnected ? (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{
                header: () => null,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                header: () => null,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: "",
                headerLeft: null,
                headerStyle: {
                  backgroundColor: black,
                },
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerTitle: "",
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerTitle: "",
              }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{
                headerTitle: "",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
