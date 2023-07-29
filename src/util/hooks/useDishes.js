import axios from "axios";
import { useEffect, useState } from "react";
import { Toast } from "react-native-toast-message";
import { API_URL } from "../consts";

export const useDishes = ({ isFocused }) => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [allDishes, setAllDishes] = useState([]);
  useEffect(() => {
    const newDishes = allDishes.filter((dish) => {
      if (!selectedCategoryId)
        return dish?.name
          ?.toLowerCase()
          .trim()
          .includes(query.toLowerCase().trim());
      return (
        dish?.name?.toLowerCase().trim().includes(query.toLowerCase().trim()) &&
        dish.cat_id == selectedCategoryId
      );
    });
    setDishes(newDishes);
  }, [selectedCategoryId, query]);

  useEffect(() => {
    getDishes();
  }, [isFocused]);

  const getDishes = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/getDishes`);
      setDishes(res.data.dish);
      setAllDishes(res.data.dish);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
      });
    }
    setIsLoading(false);
  };
  return {
    dishes,
    isLoading,
    setQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    getDishes,
  };
};

export default useDishes;
