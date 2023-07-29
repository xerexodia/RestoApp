//!This is the otp verification component
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useDispatch } from "react-redux";
import { VerifyOTPlModifyPasswordAction } from "./../../_actions/logicHandlerActions/Actions";
const { primary, white } = colors;
const StyledCodeSection = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-vertical: 35px;
  ${(props) => {
    return props.pinReady ? "opacity: 0.3;" : "opacity: 1;";
  }}
`;
const CodeInputContainer = styled.Pressable`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
`;

const HiddenTextInput = styled.TextInput`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
`;
const CodeInputText = styled.View`
  min-width: 15px;
  padding: 12px;
  border-bottom-width: 3px;
  border-color: ${primary};
`;
const CodeInputInText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: ${white};
`;
const CodeInputFocuced = styled(CodeInputText)`
  border-color: ${primary};
`;

const CodeInput = ({
  route,
  code,
  setCode,
  maxLength,
  setPinReady,
  pinReady,
}) => {
  const [focused, setFocused] = useState(false);

  const codeDigitsArray = new Array(maxLength).fill(0);

  const textInputRef = useRef(null);

  const handleOnPress = (index) => {
    setFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnSubmitEditing = () => {
    setFocused(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    //toggle pincode
    if (code.length === maxLength) {
      dispatch(VerifyOTPlModifyPasswordAction(code, route, setPinReady));
    }
    return () => {
      setPinReady(false);
    };
  }, [code]);

  const toCodeDigitInput = (value, index) => {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;
    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;
    const isDigitFocuced = isCurrentDigit || (isLastDigit && isCodeFull);

    const StyledCodeInput =
      focused && isDigitFocuced ? CodeInputFocuced : CodeInputText;

    return (
      <StyledCodeInput key={index}>
        <CodeInputInText>{digit}</CodeInputInText>
      </StyledCodeInput>
    );
  };

  return (
    <StyledCodeSection pinReady={pinReady}>
      <CodeInputContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </CodeInputContainer>

      <HiddenTextInput
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        value={code}
        editable={!pinReady}
        onChangeText={setCode}
        maxLength={maxLength}
        onSubmitEditing={handleOnSubmitEditing}
      ></HiddenTextInput>
    </StyledCodeSection>
  );
};

export default CodeInput;
