import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Layout from "../../components/layout/Layout";
import { useDispatch } from "react-redux";
import { getOrders } from "../../_actions/logicHandlerActions/Actions";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
//translate all the text to french
const Orders = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(setOrders));
  }, [isFocused]);
  return (
    <Layout navigation={navigation} headerTitle="Votre commandes " date={true}>
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-xl text-white">Les commandes</Text>
        </View>
        <View className="flex-row justify-between items-center border-b-2 border-lightGray mt-6 pb-3 mb-6">
          <Text className="font-bold text-lg text-white ">Client</Text>
          <Text className="font-bold text-lg text-white">Menu</Text>
          <Text className="font-bold text-lg text-white">Total payment</Text>
          <Text className="font-bold text-lg text-white">Status</Text>
        </View>
        <ScrollView
          className="h-[80%] w-full"
          showsVerticalScrollIndicator={false}
        >
          {orders?.map((item, index) => (
            <View
              className="flex-row justify-between items-center mb-6 "
              key={index}
            >
              <Text className="font-bold text-sm text-white">
                {item.client_name}
              </Text>
              <Text className="font-bold text-sm text-lightGray ">
                {item.id_dishes?.map((dish, index) => (
                  <Text
                    key={index}
                    className="font-bold text-sm text-lightGray   "
                  >
                    {dish.name} ,
                  </Text>
                ))}
              </Text>
              <Text className="font-bold text-sm text-lightGray">
                {item.total_price}$
              </Text>
              {item.status === 1 ? (
                <TouchableOpacity className="font-bold text-sm text-yellow bg-[#503A3A] px-7 py-1 rounded-full w-30">
                  <Text className="text-center text-[#FFB572]">En attente</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="font-bold text-sm text-yellow bg-[#324C4F] px-7 py-1 rounded-full w-30 ">
                  <Text className="text-center text-[#50D1AA] ">Complété</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};
export default Orders;
