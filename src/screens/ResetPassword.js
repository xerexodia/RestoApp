import React, { useState } from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "./../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import StyledCodeInput from "../components/inputs/ModifyPasswordCodeInput";
import ResendTimer from "../components/timers/ResendTimer";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import {
  ResetPasswordAction,
  ResendModifyPasswordOTP,
} from "./../_actions/logicHandlerActions/Actions";
import BigText from "../components/texts/BigText";
import { ResetSchema } from "../util/validationSchemas";
import { moveTo } from "../util/moveTo";

const ResetPassword = ({ navigation, route }) => {
  //The Form Wrapper for the opacity change
  const FormWrapper = styled.View`
    ${(props) => {
      return props.pinReady ? "opacity: 1;" : "opacity: 0.3;";
    }}
  `;

  const { white } = colors;

  const dispatch = useDispatch();

  //code input states
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  // resending email states
  const [resendStatus, setResendStatus] = useState("Resend");

  const resendEmail = async () => {
    if (resendStatus === "Resend") {
      dispatch(ResendModifyPasswordOTP(route, setResendStatus));
    }
  };
  return (
    <MainContainer>
      <BigText
        style={{
          marginTop: 25,
        }}
      >
        Enter the 4 digit code sent to your email
      </BigText>
      <StyledCodeInput
        code={code}
        setCode={setCode}
        maxLength={MAX_CODE_LENGTH}
        setPinReady={setPinReady}
        route={route}
        pinReady={pinReady}
      />
      <ResendTimer
        pinReady={pinReady}
        resendStatus={resendStatus}
        resendEmail={resendEmail}
        style={{ marginBottom: 25 }}
      />
      <Formik
        initialValues={{ newPassword: "", confirmNewPassword: "" }}
        validationSchema={ResetSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(
            ResetPasswordAction(
              values,
              setSubmitting,
              route,
              moveTo,
              navigation
            )
          );
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isSubmitting,
          errors,
          touched,
        }) => (
          <FormWrapper pinReady={pinReady}>
            <StyledTextInput
              icon="lock-open-variant"
              label={"New Password"}
              placeholder="**********"
              secureTextEntry={true}
              isPassword={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange("newPassword")}
              value={values.newPassword}
              onBlur={handleBlur("newPassword")}
              style={{ marginBottom: 25 }}
              editable={pinReady}
              errors={touched.newPassword && errors.newPassword}
            />
            <StyledTextInput
              icon="lock-open-variant"
              label={"Confirm New Password"}
              placeholder="**********"
              secureTextEntry={true}
              isPassword={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange("confirmNewPassword")}
              value={values.confirmNewPassword}
              onBlur={handleBlur("confirmNewPassword")}
              style={{ marginBottom: 25 }}
              editable={pinReady}
              errors={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            {!isSubmitting && (
              <RegularButton onPress={handleSubmit} disabled={!pinReady}>
                Submit
              </RegularButton>
            )}
            {isSubmitting && (
              <RegularButton disabled={true}>
                <ActivityIndicator
                  size="small"
                  color={white}
                ></ActivityIndicator>
              </RegularButton>
            )}
          </FormWrapper>
        )}
      </Formik>
    </MainContainer>
  );
};

export default ResetPassword;
