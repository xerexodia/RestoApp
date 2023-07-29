import React from "react";
import MainContainer from "../components/containers/MainContainer";
import StyledTextInput from "../components/inputs/StyledTextInput";
import { Formik } from "formik";
import RegularButton from "../components/buttons/RegularButton";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import PressableText from "../components/texts/PressableText";
import { SignupAction } from "../_actions/logicHandlerActions/Actions";
import { useDispatch } from "react-redux";
import BigText from "../components/texts/BigText";
import { moveTo } from "../util/moveTo";
import { SignupSchema } from "../util/validationSchemas";

const SignUp = ({ navigation }) => {
  const { white } = colors;

  const dispatch = useDispatch();

  return (
    <MainContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BigText style={{ marginBottom: 25 }}>Créer un compte</BigText>
        <Formik
          initialValues={{
            nom_prenom: "",
            telephone: "",
            email: "",
            password: "",
            confirmPassword: "",
            adresse: "",
            code_postal: "",
            ville: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(SignupAction(values, setSubmitting, moveTo, navigation));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            touched,
            errors,
          }) => (
            <>
              <StyledTextInput
                icon="account"
                label={"Nom et Prenom"}
                placeholder={"Entrer votre nom et prenom"}
                autoCapitalize="none"
                onChangeText={handleChange("nom_prenom")}
                onBlur={handleBlur("nom_prenom")}
                style={{ marginBottom: 15 }}
                value={values.nom_prenom}
                errors={touched.nom_prenom && errors.nom_prenom}
              />

              <StyledTextInput
                icon="email"
                label={"Addresse Email"}
                placeholder={"Entrer votre addresse email"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={{ marginBottom: 15 }}
                value={values.email}
                errors={touched.email && errors.email}
              />
              <StyledTextInput
                icon="phone"
                label={"Numéro de téléphone"}
                placeholder={"Entrer votre numéro de téléphone"}
                autoCapitalize="none"
                onChangeText={handleChange("telephone")}
                onBlur={handleBlur("telephone")}
                style={{ marginBottom: 15 }}
                value={values.telephone}
                errors={touched.telephone && errors.telephone}
              />
              <StyledTextInput
                icon="account"
                label={"Adresse"}
                placeholder={"Entrer votre adresse"}
                autoCapitalize="none"
                onChangeText={handleChange("adresse")}
                onBlur={handleBlur("adresse")}
                style={{ marginBottom: 15 }}
                value={values.adresse}
                errors={touched.adresse && errors.adresse}
              />
              <StyledTextInput
                icon="account"
                label={"Nom de ville"}
                placeholder={"Entrer votre nom de ville"}
                autoCapitalize="none"
                onChangeText={handleChange("ville")}
                onBlur={handleBlur("ville")}
                style={{ marginBottom: 15 }}
                value={values.ville}
                errors={touched.ville && errors.ville}
              />
              <StyledTextInput
                icon="account"
                label={"Code Postal"}
                placeholder={"Entrer votre code postal"}
                autoCapitalize="none"
                onChangeText={handleChange("code_postal")}
                onBlur={handleBlur("code_postal")}
                style={{ marginBottom: 15 }}
                value={values.code_postal}
                errors={touched.code_postal && errors.code_postal}
              />

              <StyledTextInput
                icon="lock"
                label={"Mot de passe"}
                placeholder="**********"
                isPassword={true}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={{ marginBottom: 15 }}
                errors={touched.password && errors.password}
              />
              <StyledTextInput
                icon="lock"
                label={"Confirmer le mot de passe"}
                isPassword={true}
                placeholder="**********"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                onBlur={handleBlur("confirmPassword")}
                style={{ marginBottom: 15 }}
                errors={touched.confirmPassword && errors.confirmPassword}
              />

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>
                  Créer votre compte
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

              <PressableText onPress={() => moveTo(navigation, "Login")}>
                Vous avez un compte ? Se connecter
              </PressableText>
            </>
          )}
        </Formik>
      </ScrollView>
    </MainContainer>
  );
};

export default SignUp;
