import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../components/colors";
import {
  ChangeStatus,
  DeleteOrder,
  getOrders,
} from "../../../_actions/logicHandlerActions/Actions";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
const OrdersView = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    dispatch(getOrders(setOrders));
  }, [isFocused]);
  const handleDelete = (id) => {
    dispatch(DeleteOrder(id));
  };
  const handleChange = (id, status) => {
    dispatch(ChangeStatus(id, status));
  };
  return (
    <View className=" h-[86%] p-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-white">Commandes</Text>
      </View>
      <View className="border-lightGray flex-row items-center justify-between pb-3 mt-6 mb-6 border-b-2">
        <Text className="text-md font-bold text-white">Client</Text>
        <Text className="text-md font-bold text-white">Status</Text>
        <Text className="text-md font-bold text-white">Delete</Text>
      </View>
      <ScrollView
        className="h-[88%] w-full"
        showsVerticalScrollIndicator={false}
      >
        {orders.map((item, index) => (
          <View
            className=" flex-row items-center justify-between mb-6 w-full "
            key={item._id}
          >
            <Text className="font-bold text-sm text-white w-[36%]">
              {item.client_name ? item.client_name : `Client#${index + 1}`}
            </Text>

            {item.status === 1 ? (
              <TouchableOpacity
                className="font-bold text-sm text-yellow bg-[#503A3A] px-5 py-1 rounded-full w-fit"
                onPress={() => handleChange(item._id, 0)}
              >
                <Text className="text-center text-[#FFB572]">En attente</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="font-bold text-sm text-yellow bg-[#324C4F] px-5 py-1 rounded-full w-fit ">
                <Text
                  onPress={() => handleChange(item._id, 1)}
                  className="text-center text-[#50D1AA] "
                >
                  Complete{" "}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleDelete(item._id)}
            >
              <MaterialCommunityIcons
                name="delete"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default OrdersView;
