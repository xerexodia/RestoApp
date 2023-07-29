import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { colors } from "../colors";
import { UPLOAD_URL } from "../../util/consts";

const DishConfig = ({ dish, index, handleClick }) => {
  return (
    <Pressable className=" w-[44%] h-60  border-lightGray border rounded-lg mb-5">
      <View key={index} className=" items-center w-full h-full">
        {dish.image ? (
          <Image
            source={{ uri: `${UPLOAD_URL}/${dish.image}` }}
            className=" w-20 h-20 mt-2 rounded-md"
          />
        ) : (
          <View className="w-20 h-20 mt-2 rounded-md bg-lightGray" />
        )}
        <Text className="text-md mt-2 font-bold text-center text-white">
          {dish.name}
        </Text>
        <View className="flex-row   items-center justify-between w-[80%] mt-2">
          <Text className="text-md text-lightGray">${dish.price}</Text>
          <Text className="text-lightGray ">{dish.numberAvailable} Boules</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            shadowColor: "rgba(192, 132, 252,0.6)",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4.65,
            elevation: 8,
          }}
          className="bg-[#50323B] w-full rounded-lg flex-row justify-evenly items-center p-2 bottom-0 absolute "
          onPress={() => handleClick(dish)}
        >
          <MaterialCommunityIcons
            name="cart"
            size={24}
            color={colors.primary}
          />

          <Text className="text-primary text-sm font-semibold text-center">
            Modifier le plat
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default DishConfig;
