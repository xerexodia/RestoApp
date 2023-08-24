import React, { useEffect, useState } from "react";
import { API_URL } from "../consts";
import axios from "axios";

const useGetCaisse = () => {
  const [data, setData] = useState(null);
  const getCaisse = async () => {
    return await axios.post(`${API_URL}/get_day_history`, {
      date: new Date().toISOString().split("T")[0],
    });
  };
  useEffect(() => {
    getCaisse()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    return () => {
      setData();
    };
  }, []);

  return { data };
};

export default useGetCaisse;
