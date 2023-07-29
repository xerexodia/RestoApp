import * as Yup from "yup";

//!Forget Password Schema
export const ForgetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Entrer une adresse email valide")
    .required("Entrer votre adresse email"),
});
//!Signup Schema
export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Entrer une adresse email valide")
    .required("Entrer votre adresse email"),
  password: Yup.string()
    .required("Mot de passe requis")
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères")
    .max(24, "Votre mot de passe doit contenir au plus 24 caractères"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Les mots de passe doivent correspondre"
  ),
  nom_prenom: Yup.string().required("Nom et prénom requis"),
  telephone: Yup.number().required("Numéro de téléphone requis"),
  ville: Yup.string().required("Ville requise"),
  code_postal: Yup.string().required("Code postal requis"),
  adresse: Yup.string().required("Adresse requise"),
});

//!Login Schema
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Entrer une adresse email valide")
    .required("Entrer votre adresse email"),
  password: Yup.string().required("Mot de passe requis"),
});
//!Reset Password Schema
export const ResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Mot de passe requis")
    .min(8, "Your password must be at least 8 characters")
    .max(24, "Your password must be at most 24 characters"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Mot de passe non identique"
  ),
});
//!Reset Password Schema
export const ResetSchemaDashboard = Yup.object().shape({
  password: Yup.string()
    .required("Mot de passe requis")
    .min(8, "Votre Mot de pass doit ontenir au moins 8 caractères ")
    .max(24, "Votre mot de passe doit contenir au plus 24 caractères"),
  newpassword: Yup.string()
    .required("Mot de passe requis")
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères")
    .max(24, "Votre mot de passe doit contenir au plus 24 caractères"),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newpassword"), null],
    "Mot de passe non identique"
  ),
});
