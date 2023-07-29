import React from "react";
import { colors } from "../colors";
import SmallText from "../texts/SmallText";
import { Pressable } from "react-native";
const { white } = colors;

const PressableText = (props) => {
  return (
    <Pressable {...props} onPress={props.onPress}>
      <SmallText
        style={{
          color: white,
          fontWeight: 600,
          textAlign: "left",
          ...props.style,
        }}
      >
        {props.children || props.title}
      </SmallText>
    </Pressable>
  );
};

export default PressableText;
