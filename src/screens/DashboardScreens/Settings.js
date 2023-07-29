import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Layout from "../../components/layout/Layout";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../components/colors";
import AboutUsView from "./SettingsScreens/AboutUs";
import NotificationsView from "./SettingsScreens/NotificationScreen";
import OrdersView from "./SettingsScreens/Orders";
import SecurityView from "./SettingsScreens/SecuirityView";
import ProductManagementView from "./SettingsScreens/ProductManagement/ProductManagementView";
import CategoryManagementView from "../../components/CategoryManagementView/CategoryManagementView";
//translate all the text to french
const Settings = ({ navigation }) => {
  const [items, setItems] = React.useState([
    {
      name: "Les commandes",
      text: "Gérer vos commandes",
      icon: "tag",
      textColor: colors.lightGray,
      iconColor: colors.primary,
      active: true,
      component: <OrdersView />,
    },
    {
      name: "Notifications",
      text: "Gérer vos notifications",
      icon: "notification",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <NotificationsView />,
    },
    {
      name: "Gestion des produits",
      text: "Gérer vos produits",
      icon: "folderopen",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <ProductManagementView />,
    },
    {
      name: "Gestion des catégories",
      text: "Gérer vos catégories",
      icon: "folderopen",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <CategoryManagementView />,
    },
    {
      name: "Sécurité",
      text: "Gérer vos informations de sécurité ",
      icon: "USB",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <SecurityView />,
    },
    {
      name: "A propos de nous",
      text: "Gérer vos informations",
      icon: "idcard",
      bgColor: colors.lightblack,
      textColor: colors.lightGray,
      iconColor: colors.lightGray,
      active: false,
      component: <AboutUsView />,
    },
  ]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  return (
    <Layout
      navigation={navigation}
      headerTitle="Paramètres General"
      searchBar={false}
    >
      <View className=" flex-row flex-1 space-x-8">
        <View className="bg-lightblack max-w-[200px]  h-full">
          {items.map((item, index) => (
            <Pressable
              key={index}
              className={`flex-row space-x-2 py-4 pl-4 pr-2 bg-red-400 ${
                selectedItemIndex == index ? "bg-[#54353B]" : "bg-transparent "
              } `}
              onPress={() => setSelectedItemIndex(index)}
            >
              <AntDesign
                name={item.icon}
                size={18}
                color={selectedItemIndex == index ? colors.primary : "white"}
              />
              <View className="">
                <Text
                  className={`font-bold text-md ${
                    selectedItemIndex == index ? "text-primary" : "text-white "
                  }`}
                >
                  {item.name}
                </Text>
                <Text className="text-lightGray text-sm">{item.text}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View className="bg-lightblack flex-1 ">
          {items[selectedItemIndex].component}
        </View>
      </View>
    </Layout>
  );
};
export default Settings;
