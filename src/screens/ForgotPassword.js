import React from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import IconHeader from "../components/icons/IconHeader";
import BigText from "../components/texts/BigText";
import PressableText from "../components/texts/PressableText";
import { useDispatch } from "react-redux";
import { ForgotPasswordAction } from "../_actions/logicHandlerActions/Actions";
import { moveTo } from "../util/moveTo";
import { ForgetPassSchema } from "../util/validationSchemas";
const ForgotPassword = ({ navigation }) => {
  const { white } = colors;

  const dispatch = useDispatch();

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <IconHeader name="key" style={{ marginBottom: 30 }} />
        <BigText
          style={{
            marginBottom: 25,
          }}
        >
          Entrer votre adresse email
        </BigText>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgetPassSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(
              ForgotPasswordAction(values, setSubmitting, moveTo, navigation)
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
            <>
              <StyledTextInput
                icon="email"
                label={"Adresse Email"}
                placeholder={"Entrer votre adresse email"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={{ marginBottom: 25 }}
                value={values.email}
                errors={touched.email && errors.email}
              />
              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>Valider</RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator
                    size="small"
                    color={white}
                  ></ActivityIndicator>
                </RegularButton>
              )}
              <PressableText
                onPress={() => moveTo(navigation, "Signup")}
                style={{ marginBottom: 7 }}
              >
                Vous n'avez pas de compte ? S'inscrire
              </PressableText>
              <PressableText onPress={() => moveTo(navigation, "Login")}>
                Mot de passe oublié ?
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default ForgotPassword;
