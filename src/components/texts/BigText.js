import React from "react";

import { colors } from "../colors";
import { Text } from "react-native";
const { white } = colors;

const BigText = (props) => {
  return (
    <Text
      {...props}
      style={{
        fontSize: 25,
        fontWeight: 600,
        textAlign: "center",
        color: props.color ? props.color : white,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export default BigText;
