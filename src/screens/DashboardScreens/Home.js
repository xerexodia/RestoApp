import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../../components/layout/Layout";
import DishCategories from "../../components/dishCategories/DishCategories";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OrdersView from "../../components/ordersView/OrdersView";
import { colors } from "../../components/colors";
import useDishes from "../../util/hooks/useDishes";
import { Notifications } from "expo-notifications";
import { useRoute } from "@react-navigation/native";
import { UPLOAD_URL } from "../../util/consts";
import { useIsFocused } from "@react-navigation/native";
import Modal from "react-native-modal";
const Home = ({ navigation }) => {
  const isFocused = useIsFocused();
  const {
    dishes,
    isLoading,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
  } = useDishes({
    isFocused,
  });
  const [orders, setOrders] = useState([]);
  const [isOrdersViewOpen, setIsOrdersViewOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [dish, setDish] = useState();
  const [number, setNumber] = useState(null);
  const [tableNumber, setTableNumber] = useState(null);
  const handleOrderNow = (dish) => {
    const newOrders = [...orders];
    const index = newOrders.findIndex((order) => order._id === dish._id);
    if (index == -1) {
      newOrders.push({ ...dish, quantity: 1 });
    } else {
      newOrders[index].quantity++;
    }

    setOrders(newOrders);
    setOpen(false);
  };
  const total = orders.reduce((acc, order) => {
    return acc + order.price * order.quantity;
  }, 0);

  useEffect(() => {
    if (orders.length > 0) setIsOrdersViewOpen(true);
    else setIsOrdersViewOpen(false);
  }, [orders.length]);

  return (
    <>
      <Layout
        navigation={navigation}
        headerTitle="Choisissez des plats"
        date={true}
        searchBar={true}
        setQuery={setQuery}
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.lightblack,
        }}
        isOrdersViewOpen={isOrdersViewOpen}
        orders={orders}
        ordersType={type}
        tableNumber={tableNumber}
        setIsOrdersViewOpen={setIsOrdersViewOpen}
      >
        <View className="flex-1">
          <DishCategories
            selectedCategoryId={selectedCategoryId}
            setSelectedCategoryId={setSelectedCategoryId}
          />
          <View className="flex-row justify-between mt-10">
            <View className="flex-row items-center">
              <Text className="text-3xl font-bold text-white">
                Choisissez des plats
              </Text>
              <TouchableOpacity
                activeOpacity={0.9}
                className="bg-primary flex items-center justify-center w-8 h-8 ml-4 rounded-lg"
                onPress={() => setIsOrdersViewOpen((prev) => !prev)}
              >
                <MaterialCommunityIcons name="cart" size={20} color="white" />
                <View className="-top-1 -right-1 bg-lightblack absolute items-center justify-center w-4 h-4 rounded-full">
                  <Text className="text-xs font-bold text-center text-white">
                    {orders.reduce((acc, order) => acc + order.quantity, 0)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="gap-x-8 gap-y-24 flex-row flex-wrap pb-10 mt-10">
              <Modal
                isVisible={open}
                onBackdropPress={() => setOpen(false)}
                backdropOpacity={0.6}
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    justifyContent: "center",
                    zIndex: 40,
                    width: 400,
                    height: 220,
                    borderRadius: 15,
                    paddingHorizontal: 20,
                  }}
                >
                  <TouchableOpacity
                    className="bg-black w-full p-5 mt-2 rounded-lg"
                    onPress={() => {
                      setType("à emporter"),
                        setOpen(false),
                        handleOrderNow(dish);
                    }}
                  >
                    <Text className="font-semibold text-center text-white">
                      à emporter
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-black w-full p-5 mt-2 rounded-lg"
                    onPress={() => {
                      setType("livraison"),
                        setOpen(false),
                        handleOrderNow(dish);
                    }}
                  >
                    <Text className="font-semibold text-center text-white">
                      Livraison
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-black w-full p-5 mt-2 rounded-lg"
                    onPress={() => {
                      setOpen(false), setShow(true);
                    }}
                  >
                    <Text className="font-semibold text-center text-white">
                      sur place
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              <Modal
                isVisible={show}
                onBackdropPress={() => setShow(false)}
                backdropOpacity={0.6}
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    justifyContent: "center",
                    width: 400,
                    height: 220,
                    borderRadius: 15,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text className="text-xl font-regular text-black">
                    N° de table:
                  </Text>
                  <TextInput
                    placeholder="Insérez votre N° de table"
                    placeholderTextColor={"#8d9195"}
                    keyboardType="decimal-pad"
                    onChangeText={(t) => setNumber(t)}
                    className="bg-input h-14 w-full px-3 text-white rounded-lg"
                  />
                  <TouchableOpacity
                    className="bg-primary w-full p-5 mt-2 rounded-lg"
                    onPress={() => {
                      setShow(false);
                      setType("sur place"), setTableNumber(number);
                      handleOrderNow(dish);
                    }}
                  >
                    <Text className="font-semibold text-center text-white">
                      Confirmer
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
              {isLoading ? (
                <View className="items-center justify-center flex-1">
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              ) : (
                dishes.map((dish, i) => (
                  <View
                    key={i}
                    className="rounded-2xl items-center p-6 bg-black min-w-[200px] pt-[90px] relative "
                  >
                    <Image
                      source={{ uri: `${UPLOAD_URL}/${dish.image}` }}
                      className="w-36 h-36 absolute -translate-y-16 rounded-md"
                    />
                    <Text className="text-lg text-center text-white">
                      {dish.name}
                    </Text>
                    <Text className="mt-2 text-center text-white">
                      {dish.price} DT
                    </Text>
                    {/* <Text className="text-lightGray mt-1 text-center">
                  {dish.numberAvailable} available
                </Text> */}
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
                      className="bg-primary w-full p-4 mt-4 rounded-lg"
                      onPress={() => {
                        !type && setOpen(true),
                          setDish(dish),
                          type && handleOrderNow(dish);
                      }}
                    >
                      <Text className="font-semibold text-center text-white">
                        Commandez
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </Layout>
    </>
  );
};

export default Home;
