//!Resend email component
import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import SmallText from "./../texts/SmallText";
import PressableText from "./../texts/PressableText";

import RowContainerSpaceBetween from "./../containers/RowContainerSpaceBetween";
const { white, fail, success } = colors;

const ResendTimer = ({
  resendStatus,
  resendEmail,
  targetTimeInSeconds,
  pinReady,
  ...props
}) => {
  const StyledView = styled.View`
    height: 80px;
    align-content: center;
    ${(props) => {
      return props.pinReady ? "opacity: 0.3;" : "opacity: 1;";
    }}
  `;

  const ResendText = styled.Text`
    color: ${white}
      ${(props) => {
        const { resendStatus } = props;
        if (resendStatus == "Failed") {
          return `color : ${fail}`;
        } else if (resendStatus == "Sent") {
          return `color : ${success}`;
        }
      }};
  `;

  return (
    <StyledView {...props} pinReady={pinReady}>
      <RowContainerSpaceBetween>
        <SmallText style={{ color: white, fontWeight: 600 }}>
          Didn't receive the code?
        </SmallText>
        <PressableText onPress={() => resendEmail()} disabled={pinReady}>
          <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
        </PressableText>
      </RowContainerSpaceBetween>
    </StyledView>
  );
};
export default ResendTimer;
