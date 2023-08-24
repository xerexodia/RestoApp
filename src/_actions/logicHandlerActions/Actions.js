import axios from "axios";
import { SET_USER, SET_SIDE_BAR_MENU } from "../types";
import jwt_decode from "jwt-decode";
import { setAuth } from "../../util/setAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { API_URL } from "../../util/consts";
//!Signup Admin
export const SignupAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/signup`, credentials);
      const { success, message } = data;

      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
        moveTo(navigation, "Login", { email: credentials.email });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
//!Login Admin
export const LoginAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, credentials);
      const { success, message } = data;

      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        const { token } = data;
        setAuth(token);
        const decode = jwt_decode(token);
        dispatch(setUser(decode));
        AsyncStorage.setItem("jwt", token);
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: `Bienvenu ${decode.nom_prenom}`,
        });
        moveTo(navigation, "Main");
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

//!User Forgot Password
export const ForgotPasswordAction =
  (credentials, setSubmitting, moveTo, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/sendMail`, credentials);
      const { success, message } = data;
      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
        setSubmitting(false);
        moveTo(navigation, "ResetPassword", {
          email: data.userInfo.email,
          id: data.userInfo.UserID,
        });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

//! Reset Password Action

export const ResetPasswordAction =
  (values, setSubmitting, route, moveTo, navigation) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/resetPassword`, {
        password: values.newPassword,
        email: route.params.email,
      });
      const { success, message } = data;
      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
        moveTo(navigation, "Login");
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
//!Get Categories
export const getCategories =
  (setCategories, setIsLoading) => async (dispatch) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/getcategory`);
      setCategories(response.data.categories);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
    setIsLoading(false);
  };
export const getCategoriesForFormik = (setItems) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/getcategory`);
    setItems(
      response.data.categories.map((category) => ({
        label: category.cat_name,
        value: category._id,
        //add an other value to the object
        id: category._id,
        key: category._id,
      }))
    );
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erreur",
      text2: error.message,
    });
  }
};
export const getOrders = (setOrders) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/getOrders`);
    setOrders(data.order);
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erreur",
      text2: error.message,
    });
  }
};
export const DeleteOrder = (id) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/deleteOrder`, {
      id_order: id,
    });
    const { message, success } = data;
    if (success == true) {
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Order supprimé avec succès",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: message,
      });
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erreur",
      text2: error.message,
    });
  }
};
export const ChangeStatus = (id, status) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/confirmOrder`, {
      id_order: id,
      status: status,
    });

    Toast.show({
      type: "success",
      text1: "Succès",
      text2: "Order status changee avec succès",
    });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erreur",
      text2: error.message,
    });
  }
};
export const uploadImage = (base64, setImage) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/uploadImage`, {
      image: base64,
    });
    setImage(data.image);
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Erreur",
      text2: error.message,
    });
  }
};
export const getOrdersWithStatus =
  (setOrdersLength, status) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/getOrdersStatus`, {
        status: status,
      });
      setOrdersLength(data.orderlength);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
export const CreateOrder =
  (setIsOrdersViewOpen, setOrders, orders, total, handlePrintTicket, mode) =>
  async (dispatch) => {
    console.log("order", {
      id_dishes: orders,
      total_price: total,
      m_consommation: mode,
    });
    try {
      const { data } = await axios.post(`${API_URL}/createOrder`, {
        id_dishes: orders,
        total_price: total,
        m_consommation: mode,
      });
      const { success, message } = data;
      if (success === true) {
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
        handlePrintTicket();
      }
      setIsOrdersViewOpen(false);
      setOrders([]);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };

export const ResetPasswordActionFromDashboard =
  (values, setSubmitting) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/updatePassword`, {
        password: values.password,
        newpassword: values.newpassword,
        email: values.email,
      });
      const { success, message } = data;
      if (success === false) {
        setSubmitting(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        setSubmitting(false);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
      }
    } catch (error) {
      setSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
export const VerifyOTPlModifyPasswordAction =
  (code, route, setPinReady) => async (dispatch) => {
    try {
      const { id } = route.params;
      const { data } = await axios.post(`${API_URL}/verify-modify-password`, {
        otp: code,
        id: id,
      });
      const { success, message } = data;
      if (success == false) {
        setPinReady(false);
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        setPinReady(true);
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
      }
    } catch (error) {
      setPinReady(false);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
export const ResendModifyPasswordOTP =
  (route, setResendStatus) => async (dispatch) => {
    try {
      const { email, id } = route.params;
      const { data } = await axios.post(`${API_URL}/resendOTP`, {
        id: id,
        email: email,
      });
      const { success, message } = data;
      if (success === false) {
        setResendStatus("Failed");
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: message,
        });
      } else if (success === true) {
        setResendStatus("Sent");
        Toast.show({
          type: "success",
          text1: "Succès",
          text2: message,
        });
      }
    } catch (error) {
      setResendStatus("Failed");
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
//?Redux Actions
//!Logout User
export const Logout = () => async (dispatch) => {
  //?Remove the token from the header and from the async storage and set the user to an empty object (so when we check if the user is logged in we will check if the user object is empty or not )
  await AsyncStorage.removeItem("jwt");
  await dispatch({
    type: SET_USER,
    payload: {},
  });
};
//!Set User
export const setUser = (decode) => ({
  //?Set the user in the store
  type: SET_USER,
  payload: decode,
});
//!Set SideBar Menu
export const setSideBarMenu = (menu) => ({
  //?Set the user in the store
  type: SET_SIDE_BAR_MENU,
  payload: menu,
});
