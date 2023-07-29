import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { getCategories } from "../../_actions/logicHandlerActions/Actions";
import { colors } from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewCategoryModal from "./NewCategoryModal";

const CategoryManagementView = () => {
  const [categories, setCategories] = useState([]);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories(setCategories, setIsLoading));
  }, []);

  useEffect(() => {
    if (isNewCategoryModalOpen === false) {
      dispatch(getCategories(setCategories, setIsLoading));
      setCategoryToUpdate({});
    }
  }, [isNewCategoryModalOpen]);

  return (
    <View className={`p-6 flex-1`}>
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-lg font-bold text-white">Categories</Text>
        <TouchableOpacity
          onPress={() => {
            setIsNewCategoryModalOpen(true);
          }}
          className="items-center justify-center bg-[#3b3b52] p-1"
        >
          <MaterialCommunityIcons name="plus" size={20} color="#dff3dd" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-4 mt-10">
          {isLoading ? (
            <View className="items-center justify-center flex-1">
              <ActivityIndicator
                className="mx-auto"
                size="large"
                color={colors.primary}
              />
            </View>
          ) : (
            categories.map((category, i) => (
              <TouchableOpacity
                key={category._id}
                className="px-8 py-2 bg-[#3b3b52] items-center flex-row space-x-2 rounded-full"
                onPress={() => {
                  setIsNewCategoryModalOpen(true);
                  setCategoryToUpdate(category);
                }}
              >
                <Text className="font-semibold text-white">
                  {category.cat_name}
                </Text>

                <MaterialCommunityIcons
                  name="pencil"
                  size={14}
                  color="#dff3dd"
                />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {isNewCategoryModalOpen && (
        <NewCategoryModal
          categoryToUpdate={categoryToUpdate}
          setCategoryToUpdate={setCategoryToUpdate}
          setIsNewCategoryModalOpen={setIsNewCategoryModalOpen}
        />
      )}
    </View>
  );
};
export default CategoryManagementView;
