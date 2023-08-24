import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { API_URL } from "../../util/consts";
import axios from "axios";

const Caisse = () => {
  const getCaisse = async () => {
    const data = await axios.post(`${API_URL}/get_day_history`, {
      date: "2023-01-08",
    });
    console.log(data.data);
  };
  useEffect(() => {
    getCaisse();
  }, []);
  return (
    <View>
      <Text>Caisse</Text>
    </View>
  );
};

export default Caisse;

const styles = StyleSheet.create({});
