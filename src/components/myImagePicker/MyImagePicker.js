import { Image, ToastAndroid, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { uploadImage } from "../../_actions/logicHandlerActions/Actions";
import { useDispatch } from "react-redux";
import { UPLOAD_URL } from "../../util/consts";

const MyImagePicker = ({ setImage, image, currentImage }) => {
  const dispatch = useDispatch();
  const [galleryPermission, setGalleryPermission] = useState(null);

  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    setGalleryPermission(imagePermission.status === "granted");

    if (imagePermission.status !== "granted") {
      setToastMsg("Permission for media access needed.");
    }
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      title: "Choisir une image",
      type: "library",
      options: {
        selectionLimit: 1,
        mediaType: "photo",
        includeBase64: false,
      },
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // quality: 1,
    });
    setImage(result.assets[0]);
  };

  return (
    <TouchableOpacity
      className="bg-lightblack items-center justify-center w-16 h-16 mx-auto overflow-hidden rounded-full"
      style={{
        shadowColor: "rgba(192, 132, 252,0.2)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4.65,
        elevation: 7,
      }}
      onPress={pick}
    >
      {image?.uri ? (
        <Image className="w-full h-full" source={{ uri: image.uri }} />
      ) : currentImage ? (
        <Image
          className="w-full h-full"
          source={{ uri: `${UPLOAD_URL}/${currentImage}` }}
        />
      ) : (
        <MaterialCommunityIcons name="image-plus" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default MyImagePicker;
