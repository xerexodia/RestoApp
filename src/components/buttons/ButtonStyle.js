//!This is the button of all screens
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import RegularText from "../texts/RegularText";
const { primary, white } = colors;
const ButtonView = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${primary};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-raduis: 40px;
  height: 60px;
  margin-bottom: 60px;
`;
const ButtonStyle = ({ color, ...props }) => {
  return (
    <ButtonView
      {...props}
      onPress={props.onPress}
      style={{ borderRadius: "20px" }}
    >
      <RegularText style={[{ color: white, ...props?.textStyle }]}>
        {props.children}
      </RegularText>
    </ButtonView>
  );
};

export default ButtonStyle;
