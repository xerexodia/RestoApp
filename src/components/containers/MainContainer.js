//!This is the main container where you can adjust the padding and margin of the app
import React from "react";
import { SafeAreaView } from "react-native";
import { colors } from "../colors";
const { black } = colors;

const MainContainer = (props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 25,
        backgroundColor: props.color ? props.color : black,
      }}
      {...props}
    >
      {props.children}
    </SafeAreaView>
  );
};

export default MainContainer;
