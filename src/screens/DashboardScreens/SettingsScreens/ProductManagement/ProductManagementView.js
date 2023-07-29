import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DishCategories from "../../../../components/dishCategories/DishCategories";
import AddNewDish from "../../../../components/buttons/AddNewDish";
import DishConfig from "../../../../components/dishConfiguration/DishConfig";
import useDishes from "../../../../util/hooks/useDishes";
import { colors } from "../../../../components/colors";
import NewDishModal from "./NewDishModal";
import { useRoute } from "@react-navigation/native";

const ProductManagementView = () => {
  const routeName = useRoute().name;
  const {
    dishes,
    isLoading,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    getDishes,
  } = useDishes({
    routeName,
  });

  const [isNewDishModalOpen, setIsNewDishModalOpen] = useState(false);

  const [dishToUpdate, setDishToUpdate] = useState({});

  useEffect(() => {
    if (isNewDishModalOpen === false) {
      getDishes();
      setDishToUpdate({});
    }
  }, [isNewDishModalOpen]);

  return (
    <View className={`p-6 flex-1`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-bold text-white">Commandes</Text>
      </View>
      <View className="w-full mt-6">
        <DishCategories
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          smallText={true}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between mt-10">
          <AddNewDish setIsNewDishModalOpen={setIsNewDishModalOpen} />
          {isLoading ? (
            <View className="items-center justify-center flex-1">
              <ActivityIndicator
                className="mx-auto"
                size="large"
                color={colors.primary}
              />
            </View>
          ) : (
            dishes.map((dish, i) => (
              <DishConfig
                handleClick={(_dish) => {
                  setIsNewDishModalOpen(true);
                  setDishToUpdate(_dish);
                }}
                dish={dish}
                key={dish._id}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      {isNewDishModalOpen && (
        <NewDishModal
          dishToUpdate={dishToUpdate}
          setDishToUpdate={setDishToUpdate}
          setIsNewDishModalOpen={setIsNewDishModalOpen}
        />
      )}
    </View>
  );
};
export default ProductManagementView;
