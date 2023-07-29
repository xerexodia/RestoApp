import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { Text } from "react-native";
const { white } = colors;
const StyledText = styled.Text`
  font-size: 13px;
  color: ${white};
  text-align: center;
`;
const SmallText = (props) => {
  return (
    <Text className="text-md text-white text-center" {...props}>
      {props.children}
    </Text>
  );
};

export default SmallText;
