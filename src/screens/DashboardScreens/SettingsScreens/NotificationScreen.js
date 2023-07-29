import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../../components/colors";

const NotificationsView = () => {
  return (
    <View className="p-5 space-y-4">
      <View className="bg-black/40 items-center justify-between p-4 rounded-md">
        <View className="flex-row justify-between w-full">
          <View>
            <Text className="text-primary text-lg font-bold">New Order</Text>
            <Text className="text-lightGray text-xs font-bold">12:00 PM</Text>
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <Text className="mt-2 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>
      <View className="bg-black/40 items-center justify-between p-4 rounded-md">
        <View className="flex-row justify-between w-full">
          <View>
            <Text className="text-primary text-lg font-bold">New Order</Text>
            <Text className="text-lightGray text-xs font-bold">12:00 PM</Text>
          </View>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <Text className="mt-2 text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Text>
      </View>
    </View>
  );
};

export default NotificationsView;
