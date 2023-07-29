//!This is the input coponents of all forms
import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallText from "./../texts/SmallText";

const { white, secondary, primary, lightGray, black, lightblack } = colors;

const RowContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: -18px;
`;
const InputField = styled.TextInput`
  padding-left: 65px;
  padding-right: 65px;
  font-size: 14px;
  color: ${white};
  border-width: 2px;
`;

const LeftIcon = styled.View`
  position: absolute;
  top: 35px;
  left: 15px;
  z-index: 1;
  border-right-width: 2px;
  border-color: ${secondary};
  padding-right: 10px;
`;
const RightIcon = styled.TouchableOpacity`
  position: absolute;
  top: 35px;
  right: 15px;
  z-index: 1;
`;

const StyledTextInput = ({ icon, label, isPassword, errors, ...props }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View>
      <LeftIcon>
        <MaterialCommunityIcons name={icon} size={18} color={primary} />
      </LeftIcon>

      <SmallText
        style={{
          fontWeight: "600",
          marginBottom: 5,
          color: white,
          textAlign: "left",
          fontSize: 13,
        }}
      >
        {label}
      </SmallText>

      <InputField
        {...props}
        placeholderTextColor={lightGray}
        style={{
          textAlignVertical: props.multiline ? "top" : "center",
          paddingTop: props.multiline ? 12 : 0,
          backgroundColor: lightblack,
          ...props?.style,
          borderRadius: 8,
          borderColor: errors ? "red" : secondary,
          height: props.multiline ? 100 : 40,
        }}
        secureTextEntry={isPassword && hidePassword}
      />

      {
        //if there is an error show the error message and the icon of error message
        errors && (
          //show text that contain the error message
          <RowContainer>
            <Text className="font-semibold text-red-600 text-sm">{errors}</Text>
            <MaterialCommunityIcons name="alert-circle" size={18} color="red" />
          </RowContainer>
        )
      }

      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <MaterialCommunityIcons
            name={hidePassword ? "eye-off" : "eye"}
            size={18}
            color={primary}
          ></MaterialCommunityIcons>
        </RightIcon>
      )}
    </View>
  );
};

export default StyledTextInput;
