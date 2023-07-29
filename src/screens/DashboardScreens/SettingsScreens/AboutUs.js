import React from "react";
import { View, Text, Image } from "react-native";

const AboutUsView = () => {
  return (
    <>
      <View className={`flex-col justify-between p-5 flex`}>
        <Text className=" text-lg font-bold text-white">
          Bienvenue dans notre système de gestion de restaurant
        </Text>
        <Text className="text-primary self-start text-md font-bold text-center">
          À propos de nous:
        </Text>
        <Text className="text-sm self-start text-left text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing
        </Text>
      </View>

      <View className={`flex-col justify-center items-center mt-8 `}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzaHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
          }}
          className="w-32 h-32 rounded-md"
        />
        <Text className="text-sm self-start pl-8 mt-8 text-left text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        </Text>
      </View>
    </>
  );
};

export default AboutUsView;
