import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import Layout from "../../components/layout/Layout";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { getOrdersWithStatus } from "../../_actions/logicHandlerActions/Actions";
import { useIsFocused } from "@react-navigation/native";
const Main = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [ordersLength, setOrdersLength] = useState(0);
  const [ordersPendingLength, setOrdersPendingLength] = useState(0);
  useEffect(() => {
    dispatch(getOrdersWithStatus(setOrdersPendingLength, 1));
    dispatch(getOrdersWithStatus(setOrdersLength, 0));
  }, [isFocused]);
  return (
    <Layout
      navigation={navigation}
      headerTitle="Statistique et paramétrage caisse"
      date={true}
    >
      <View>
        <View className="w-full flex-row justify-between items-center p-5 bg-lightblack mb-5 rounded-xl">
          <Text className="text-white  font-bold text-lg p-5">
            Les commande complete d aujourd hui:
          </Text>
          <View className=" w-[100px] h-[100px] rounded-full bg-primary  flex-row justify-center items-center">
            <Text className="text-3xl text-white  ">{ordersLength}</Text>
          </View>
        </View>
        <View className="w-full flex-row justify-between items-center p-5 bg-lightblack">
          <Text className="text-white font-bold text-lg p-5">
            Les commande en cours:
          </Text>
          <View className=" w-[100px] h-[100px] rounded-full bg-primary  flex-row justify-center items-center">
            <Text className="text-3xl text-white  ">{ordersPendingLength}</Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default Main;
