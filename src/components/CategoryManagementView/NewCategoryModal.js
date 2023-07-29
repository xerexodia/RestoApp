import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { colors } from "../colors";
import axios from "axios";
import { API_URL } from "../../util/consts";
import StyledTextInput from "../inputs/StyledTextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import RegularButton from "../buttons/RegularButton";
import Toast from "react-native-toast-message";

const newCategorySchema = Yup.object().shape({
  cat_name: Yup.string()
    .required("Entrer le nom du catégorie")
    .min(3, "Le nom du catégorie doit contenir au moins 3 caractères"),
});

const NewCategoryModal = ({ setIsNewCategoryModalOpen, categoryToUpdate }) => {
  const createUpdateCategory = async (values, setSubmitting) => {
    try {
      const res = await axios.post(
        `${API_URL}/${
          categoryToUpdate?._id ? "updateCategory" : `createCategory`
        }`,
        {
          id: categoryToUpdate?._id,
          ...values,
        }
      );
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "Nouveau catégorie ajouté avec succès",
      });
      setIsNewCategoryModalOpen(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
    setSubmitting(false);
  };

  const deleteCategory = async () => {
    try {
      const res = await axios.post(`${API_URL}/deleteCategory`, {
        id: categoryToUpdate._id,
        ...categoryToUpdate,
      });
      Toast.show({
        type: "success",
        text1: "Succès",
        text2: "La catégorie a été supprimée avec succès",
      });
      setIsNewCategoryModalOpen(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
  };
  return (
    <>
      <Pressable
        onPress={() => setIsNewCategoryModalOpen(false)}
        className="bg-black/50 absolute top-0 bottom-0 left-0 right-0"
      />
      <Animated.View
        entering={FadeInDown.duration(300)}
        exiting={FadeOutDown.duration(300)}
        className="rounded-2xl absolute h-full max-h-[700px] bottom-4 right-4 left-4 max-w-[500px] p-8 bg-black"
        style={{
          shadowColor: "rgba(192, 132, 252,0.2)",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowRadius: 4.65,
          elevation: 7,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            <Text className="text-3xl font-bold text-white">Category</Text>
            {categoryToUpdate?._id && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => deleteCategory()}
              >
                <MaterialCommunityIcons
                  name="delete"
                  size={30}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsNewCategoryModalOpen(false)}
          >
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 mt-10">
          <Formik
            initialValues={{ cat_name: categoryToUpdate?.cat_name || "" }}
            validationSchema={newCategorySchema}
            onSubmit={(values, { setSubmitting }) => {
              createUpdateCategory(values, setSubmitting);
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
                <ScrollView
                  className="my-8"
                  showsVerticalScrollIndicator={false}
                >
                  <View className="">
                    <StyledTextInput
                      icon="food-variant"
                      label={"Nom du catégorie"}
                      placeholder={"Entrer le nom du catégorie"}
                      onChangeText={handleChange("cat_name")}
                      onBlur={handleBlur("cat_name")}
                      style={{ marginBottom: 25 }}
                      value={values.cat_name}
                      errors={touched.cat_name && errors.cat_name}
                    />
                  </View>
                </ScrollView>
                {!isSubmitting && (
                  <RegularButton onPress={handleSubmit}>Valider</RegularButton>
                )}
                {isSubmitting && (
                  <RegularButton disabled={true}>
                    <ActivityIndicator size="small" color={colors.white} />
                  </RegularButton>
                )}
              </>
            )}
          </Formik>
        </View>
      </Animated.View>
    </>
  );
};

export default NewCategoryModal;
