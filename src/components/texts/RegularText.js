import React from "react";
import { Text } from "react-native";
import { colors } from "../colors";
const { white } = colors;

const RegularText = (props) => {
  return (
    <Text
      {...props}
      style={{ fontSize: 13, color: props.color ? props.color : white }}
    >
      {props.children}
    </Text>
  );
};

export default RegularText;
