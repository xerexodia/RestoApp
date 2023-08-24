import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import * as Print from "expo-print";

import Layout from "../../components/layout/Layout";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { getOrdersWithStatus } from "../../_actions/logicHandlerActions/Actions";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { API_URL } from "../../util/consts";
import axios from "axios";
import Modal from "react-native-modal";
import useGetCaisse from "../../util/hooks/useGetCaisse";
import KeyboardWrapper from "../../components/containers/KeyBoardWrapper";
const Main = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [fond, setFond] = useState(false);
  const [ordersLength, setOrdersLength] = useState(0);
  const [ordersPendingLength, setOrdersPendingLength] = useState(0);
  useEffect(() => {
    dispatch(getOrdersWithStatus(setOrdersPendingLength, 1));
    dispatch(getOrdersWithStatus(setOrdersLength, 0));
  }, [isFocused]);
  const navigate = useNavigation();
  const { data } = useGetCaisse();
  const handlePrintTicket = async () => {
    const ticketHTML = `
    <div style="width: 300px; padding: 10px; border: 1px solid #000; display:flex; flex-direction:column; gap:8px;">
      <div style="display:flex; flex-direction:column; gap:3px; align-items:center;">
        <span style="font-size:44px; font-weight:500;">Caisse Z</span>
        <span style="font-size:22px; font-weight:500;">Food Land</span>
        <span style="font-size:18px;">Adresse: 12 rue ibn rochd</span>
        <span style="font-size:18px;">Tel: +33 213 123</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:18px;">Impression: ${new Date().toISOString()}</span>
        <span style="font-size:18px;">Ouverture: 2023-12-12 09:15</span>
        <span style="font-size:18px;">Fermeture: 2023-12-12 09:15</span>
      </div>
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:22px; font-weight:500; align-self:center; margin-bottom:10px;">Mode de payment</span>
        <span style="font-size:18px;">espèces: ${
          data?.payment_method?.cash
        }€</span>
        <span style="font-size:18px;">cartes: ${
          data?.payment_method?.card
        }€</span>
      </div>
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:18px;">Commandes: ${data?.commandes}</span>
        <span style="font-size:18px;">Clients: ${data?.clients_number}</span>
        <span style="font-size:18px;">Tickets moyen: ${data?.ticket_moy?.toFixed(
          2
        )}€</span>
      </div>
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:22px; font-weight:500; align-self:center; margin-bottom:10px;">Vente Produits</span>
        ${data?.message_type?.map((item) =>
          item?.id_dishes?.map(
            (prod) =>
              `
            <div style="display:flex; width:100%; align-items:center; justify-content:space-between">
              <span style="font-size:18px;">${prod?.quantity}X ${
                prod?.description
              }:</span>
              <span style="font-size:18px;">${
                parseFloat(prod?.price) * parseFloat(prod?.quantity)
              }€</span>
            </div>
            `
          )
        )}
      </div>
      
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:22px; font-weight:500; align-self:center; margin-bottom:10px;">Repartition TVA</span>
        <div style="display:flex; width:100%; align-items:center; justify-content:space-between">
          <span style="font-size:18px;">TVA(5%)=${
            data?.prep_tva?.tva5?.quantity
          }</span>
          <span style="font-size:18px;">TotalHT:${
            data?.prep_tva?.tva5?.total
          }</span>
        </div>
        <div style="display:flex; width:100%; align-items:center; justify-content:space-between">
          <span style="font-size:18px;">TVA(10%)=${
            data?.prep_tva?.tva10?.quantity
          }</span>
          <span style="font-size:18px;">TotalHT:${
            data?.prep_tva?.tva10?.total
          }</span>
        </div>
        <div style="display:flex; width:100%; align-items:center; justify-content:space-between">
          <span style="font-size:18px;">TVA(20%)=${
            data?.prep_tva?.tva20?.quantity
          }</span>
          <span style="font-size:18px;">TotalHT:${
            data?.prep_tva?.tva20?.total
          }</span>
        </div>
        
      </div>
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:22px; font-weight:500; align-self:center; margin-bottom:10px;">Commandes Annulées</span>
        <span style="font-size:16px;">N° 22 a 9:30 par serveur_1 : Aucun : 32€</span>
      </div>
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:22px; font-weight:500; align-self:center; margin-bottom:10px;">Modes Consammation</span>
        <span style="font-size:18px;">SUR PLACE: ${
          data?.m_consommation?.sur_place
        }</span>
        <span style="font-size:18px;">LIVRAISON: ${
          data?.m_consommation?.emporter
        }</span>
        <span style="font-size:18px;">EMPORTER: ${
          data?.m_consommation?.livraison
        }</span>
      </div>
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:22px; font-weight:500; margin-bottom:10px;">TOTAL HT: ${
          data?.total_ht
        } €</span>
        <span style="font-size:22px; font-weight:500; margin-bottom:10px;">TOTAL TTC: ${
          data?.total_ttc
        } €</span>
      </div>
      <hr style="width:80%; padding:1px; color:black; ">
      <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-start;">
        <span style="font-size:22px; font-weight:500; margin-bottom:10px;">FOND initial ${fond}</span>
        <span style="font-size:22px; font-weight:500; margin-bottom:10px;">FOND final: ${
          parseFloat(data?.total_ttc) + parseFloat(fond)
        } €</span>
        </div>
        <span style="font-size:14px; ">Date & Heure 2023-12-12 9:12</span>
    </div>
  `;
    try {
      const { uri } = await Print.printToFileAsync({ html: ticketHTML });
      await Print.printAsync({ uri });

      // setIsOrdersViewOpen(false);
      // setOrders([]);
    } catch (error) {
      console.error("Failed to print ticket:", error);
    }
  };

  return (
    <Layout
      navigation={navigation}
      headerTitle="Statistique et paramétrage caisse"
      date={true}
    >
      <Modal
        isVisible={open}
        coverScreen={false}
        style={{ margin: 0 }}
        onBackdropPress={() => setOpen(false)}
      >
        <View className="rounded-2xl flex-[0.5]  p-8 bg-black items-center">
          <KeyboardWrapper>
            <>
              <TextInput
                placeholder="fond de caisse"
                placeholderTextColor={"#8d9195"}
                keyboardType="decimal-pad"
                onChangeText={(t) => setFond(t)}
                className="bg-input h-14 w-full px-3 text-white rounded-lg"
              />
              <View style={{ marginVertical: 20 }} />
              <TouchableOpacity
                activeOpacity={0.9}
                className="bg-primary p-4 mt-4 rounded-lg"
                onPress={() => setOpen(false)}
              >
                <Text className="text-lg font-bold text-center text-white">
                  CONFIRMER
                </Text>
              </TouchableOpacity>
            </>
          </KeyboardWrapper>
        </View>
      </Modal>
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
        <View className="flex-row self-end items-center mt-5 ">
          <TouchableOpacity
            onPress={handlePrintTicket}
            className="bg-primary pt-3 pb-3 pl-8 pr-8 rounded-lg mr-10"
          >
            <Text className="text-3xl text-white ">Z-Caisse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            className="bg-primary pt-3 pb-3 pl-8 pr-8 rounded-lg "
          >
            <Text className="text-3xl text-white ">Débuter journée</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Main;
