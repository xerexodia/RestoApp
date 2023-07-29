import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import { colors } from "../colors";
const AddNewDish = ({ setIsNewDishModalOpen }) => {
  return (
    <Pressable
      onPress={setIsNewDishModalOpen}
      className=" w-[44%] h-60 p-5 border-primary border border-dashed  flex-row justify-center items-center  mb-5"
    >
      <View className="flex flex-col items-center justify-center">
        <MaterialCommunityIcons name="plus" size={30} color={colors.primary} />
        <Text className="text-primary text-center">
          Ajouter un nouveau plat
        </Text>
      </View>
    </Pressable>
  );
};

export default AddNewDish;
