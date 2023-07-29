import React from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import BigText from "../components/texts/BigText";
import PressableText from "../components/texts/PressableText";
import { useDispatch } from "react-redux";
import { LoginAction } from "../_actions/logicHandlerActions/Actions";
import { moveTo } from "../util/moveTo";
import { LoginSchema } from "../util/validationSchemas";
const Login = ({ navigation, route }) => {
  const { white } = colors;
  const dispatch = useDispatch();
  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BigText
          style={{
            marginBottom: 25,
          }}
        >
          Connecter vous à votre compte !
        </BigText>
        <Formik
          initialValues={{
            email: route.params?.email ? route.params.email : "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(LoginAction(values, setSubmitting, moveTo, navigation));
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
              <StyledTextInput
                icon="lock"
                label={"Mot de passe"}
                placeholder={"Entrer votre mot de passe"}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                isPassword={true}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={{ marginBottom: 25 }}
                errors={touched.password && errors.password}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>Connecter</RegularButton>
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
              <PressableText
                onPress={() => moveTo(navigation, "ForgotPassword")}
              >
                Mot de passe oublié ?
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default Login;
