import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../_actions/logicHandlerActions/Actions";

const DishCategories = ({
  selectedCategoryId,
  setSelectedCategoryId,
  smallText,
}) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories(setCategories, setIsLoading));
  }, []);

  return (
    <View className="border-gray-100/10 flex-row flex-wrap w-full  border-b h-fit justify-evenly  ">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectedCategoryId(null)}
      >
        <Text
          className={`${smallText ? "text-md" : "text-lg"} p-1 ${
            selectedCategoryId == null ? "text-primary" : "text-white"
          }`}
        >
          Tous
        </Text>
        <View
          className={`w-full${
            selectedCategoryId == null ? "bg-primary" : "bg-transparent"
          }`}
        />
      </TouchableOpacity>
      {categories?.map((category, i) => (
        <TouchableOpacity
          key={category._id}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryId(category._id)}
        >
          <Text
            className={`${smallText ? "text-md" : "text-lg"} p-1   ${
              selectedCategoryId == category._id ? "text-primary" : "text-white"
            }`}
          >
            {category.cat_name}
          </Text>
          <View
            className={`w-full  ${
              category._id == selectedCategoryId
                ? "bg-primary"
                : "bg-transparent"
            }`}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DishCategories;
