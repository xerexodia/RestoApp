import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import CheckBox from "expo-checkbox";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  FadeInRight,
  FadeOutRight,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { colors } from "../colors";
import { CreateOrder } from "../../_actions/logicHandlerActions/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Print from "expo-print";
import { UPLOAD_URL } from "../../util/consts";
import Modal from "react-native-modal";
import KeyboardWrapper from "../containers/KeyBoardWrapper";
const OrdersView = ({
  orders,
  setOrders,
  tableNumber,
  setIsOrdersViewOpen,
  ordersType,
}) => {
  const user = useSelector((state) => state.auth.user);

  const getOrderType = (type) => {
    if (type === "livraison") return 3;
    if (type === "à emporter") return 2;
    if (type === "sur place") return 1;
  };
  const mode = getOrderType(ordersType);

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [clientMoney, setClientMoney] = useState(0);
  const [show, setShow] = useState(false);
  const [cashPayment, setCashPayment] = useState(0);
  const [cardPayment, setCardPayment] = useState(0);
  const [isClientMoneyModalOpen, setIsClientMoneyModalOpen] = useState(false);
  const total = orders
    .reduce((acc, order) => acc + order.price * order.quantity, 0)
    .toFixed(2);
  const handlePrintTicket = async () => {
    // Calculate the total price including TVA
    const totalPrice = orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0
    );
    const tva = totalPrice * 0.05;
    const totalWithTVA = totalPrice + tva;
    // Format the date to be like this: 2021-05-31
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    const ticketHTML = checked
      ? `
      <html>
     
      <body>
        <div class="pagebreak"><div style="width: 300px; padding: 10px; border: 1px solid #000; display:flex; flex-direction:column;">
        <h1 style="text-align: center; font-size: 1.2rem; font-weight: bold; margin: 0 0 10px;">Ticket</h1>
        <div style="margin-bottom: 10px;">
                  <p style="font-size: 0.9rem; margin: 0;">Adresse: rue ibn kholdoun </p>
                  <p style="font-size: 0.9rem; margin: 0;">Tel: +523 12323 123 </p>
                  <p style="font-size: 0.9rem; margin: 0;">N° SIRET: qsd123 </p>
                  <h1 style="text-align: center;  font-weight: bold; margin: 18px 0;">Payée</h1>
                  <p style="font-size: 0.9rem; margin: 0;">Nom du client: mohamed </p>
                  <p style="font-size: 0.9rem; margin: 0;">N° de commande: #123123545DF </p>
                  ${
                    tableNumber
                      ? `<p style="font-size: 0.9rem; margin: 0;">N° de table: ${tableNumber}</p>:`
                      : ""
                  }
                  <p style="font-size: 0.9rem; margin: 0;">Nom du caissier: ${
                    user?.fullname
                  } </p>
                  <p style="font-size: 0.9rem; margin: 0;">Type de commande: ${ordersType} </p>
                  <p style="font-size: 0.9rem; margin: 0;">Mode du paiement: ${
                    paymentMethod === "other" ? "autre" : "payement via card"
                  } </p>
                  <hr style="border: none; border-top: 1px dashed #000; margin: 15px 0;">
    
                  ${orders
                    ?.map(
                      (order) => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.9rem; margin: 0;">${order.name} </p>
                  <p style="font-size: 0.9rem; margin: 0;">${order.quantity}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.8rem; margin: 0 0 0 20px;">Prix par pièce:</p>
                  <p style="font-size: 0.8rem; margin: 0;">${order.price} €</p>
                </div>
                `
                    )
                    .join("")}
                    </div>
                    <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
        <div style="display: flex; flex-direction:column; justify-content: space-between; margin-bottom: 5px;">
              ${
                paymentMethod === "other"
                  ? `
                  <div style="display: flex; margin-bottom:5px; justify-content: space-between; ">
                  <p style="font-size: 0.8rem; margin: 0;">montant payé en éspèces:</p>
                  <p style="font-size: 0.8rem; margin: 0; margin-right:8px">${cashPayment} €</p>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                  <p style="font-size: 0.8rem; margin: 0;">montant payé via carte:</p>
                  <p style="font-size: 0.8rem; margin: 0;margin-right:8px">${cardPayment} €</p>
                  
                  `
                  : `
                    <div style="display: flex; margin-bottom:5px; justify-content: space-between; ">
                  <p style="font-size: 0.8rem; margin: 0;">montant payé en éspèces:</p>
                  <p style="font-size: 0.8rem; margin: 0; margin-right:8px">${clientMoney} €</p>
                  </div>
                  
                    `
              }
              </div>
                  <div>
                  <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.8rem; margin: 0;">Total Payé:</p>
                  <p style="font-size: 0.8rem; margin: 0;">${
                    paymentMethod === "cash"
                      ? clientMoney
                      : parseFloat(cardPayment) + parseFloat(cashPayment)
                  } €</p>
                  </div>
                  <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.8rem; margin: 0;">TVA (5%):</p>
                  <p style="font-size: 0.8rem; margin: 0;">${(
                    total * 0.05
                  ).toFixed(2)} €</p>
                </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">Total (Including TVA):</p>
          <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">${totalWithTVA.toFixed(
            2
          )} €</p>
        </div>
        <div>
        <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <p style="font-size: 0.8rem; margin: 0;">Reste a Payé:</p>
        <p style="font-size: 0.8rem; margin: 0;">${
          paymentMethod === "cash"
            ? totalWithTVA.toFixed(2) - clientMoney
            : totalWithTVA.toFixed(2) -
              (parseFloat(cardPayment) + parseFloat(cashPayment))
        } €</p>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; margin-top:20px;">
        <p style="text-align: right; margin: 0 0 10px;">Date: ${formattedDate}</p>
        <p>Mot de passe WIFI: 1231931239</p>
        <p style="text-align:center;">Bonne appétit,<br/> Merci pour votre visite</p>
        <img id='barcode' 
        src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" 
        alt=""  
        title="HELLO" 
        width="70" 
        height="70"
        style=" margin:30px 0 10px 0;"
        />
        <span style="margin-top:20px; font-size:20px; font-weight:500;">(1/2)</span>

        </div>
        </div>
      </div>
      
      
      
      <div class="pagebreak">
      <div style="width: 300px; padding: 10px; border: 1px solid #000; display:flex; flex-direction:column;">
        <h1 style="text-align: center; font-size: 1.2rem; font-weight: bold; margin: 0 0 10px;">Ticket</h1>
        <div style="margin-bottom: 10px;">
                  <p style="font-size: 0.9rem; margin: 0;">Adresse: rue ibn kholdoun </p>
                  <p style="font-size: 0.9rem; margin: 0;">Tel: +523 12323 123 </p>
                  <p style="font-size: 0.9rem; margin: 0;">N° SIRET: qsd123 </p>
                  <h1 style="text-align: center;  font-weight: bold; margin: 18px 0;">Payée</h1>
                  <p style="font-size: 0.9rem; margin: 0;">Nom du client: mohamed </p>
                  <p style="font-size: 0.9rem; margin: 0;">N° de commande: #123123545DF </p>
                  ${
                    tableNumber
                      ? `<p style="font-size: 0.9rem; margin: 0;">N° de table: ${tableNumber}</p>:`
                      : ""
                  }
                  <p style="font-size: 0.9rem; margin: 0;">Nom du caissier: ${
                    user?.fullname
                  } </p>
                  <p style="font-size: 0.9rem; margin: 0;">Type de commande: ${ordersType} </p>
                  <p style="font-size: 0.9rem; margin: 0;">Mode du paiement: ${
                    paymentMethod === "other" ? "autre" : "payement via card"
                  } </p>
                  <hr style="border: none; border-top: 1px dashed #000; margin: 15px 0;">
    
                  ${orders
                    ?.map(
                      (order) => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.9rem; margin: 0;">${order.name} </p>
                  <p style="font-size: 0.9rem; margin: 0;">${order.quantity}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.8rem; margin: 0 0 0 20px;">Prix par pièce:</p>
                  <p style="font-size: 0.8rem; margin: 0;">${order.price} €</p>
                </div>
                `
                    )
                    .join("")}
                    </div>
                    <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
        <div style="display: flex; flex-direction:column; justify-content: space-between; margin-bottom: 5px;">
              ${
                paymentMethod === "other"
                  ? `
                  <div style="display: flex; margin-bottom:5px; justify-content: space-between; ">
                  <p style="font-size: 0.8rem; margin: 0;">montant payé en éspèces:</p>
                  <p style="font-size: 0.8rem; margin: 0; margin-right:8px">${cashPayment} €</p>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                  <p style="font-size: 0.8rem; margin: 0;">montant payé via carte:</p>
                  <p style="font-size: 0.8rem; margin: 0;margin-right:8px">${cardPayment} €</p>
                  
                  `
                  : `
                    <div style="display: flex; margin-bottom:5px; justify-content: space-between; ">
                  <p style="font-size: 0.8rem; margin: 0;">montant payé en éspèces:</p>
                  <p style="font-size: 0.8rem; margin: 0; margin-right:8px">${clientMoney} €</p>
                  </div>
                  
                    `
              }
              </div>
                  <div>
                  <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.8rem; margin: 0;">Total Payé:</p>
                  <p style="font-size: 0.8rem; margin: 0;">${
                    paymentMethod === "cash"
                      ? clientMoney
                      : parseFloat(cardPayment) + parseFloat(cashPayment)
                  } €</p>
                  </div>
                  <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                  <p style="font-size: 0.8rem; margin: 0;">TVA (5%):</p>
                  <p style="font-size: 0.8rem; margin: 0;">${(
                    total * 0.05
                  ).toFixed(2)} €</p>
                </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">Total (Including TVA):</p>
          <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">${totalWithTVA.toFixed(
            2
          )} €</p>
        </div>
        <div>
        <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <p style="font-size: 0.8rem; margin: 0;">Reste a Payé:</p>
        <p style="font-size: 0.8rem; margin: 0;">${
          paymentMethod === "cash"
            ? totalWithTVA.toFixed(2) - clientMoney
            : totalWithTVA.toFixed(2) -
              (parseFloat(cardPayment) + parseFloat(cashPayment))
        } €</p>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; margin-top:20px;">
        <p style="text-align: right; margin: 0 0 10px;">Date: ${formattedDate}</p>
        <p>Mot de passe WIFI: 1231931239</p>
        <p style="text-align:center;">Bonne appétit,<br/> Merci pour votre visite</p>
        <img id='barcode' 
        src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" 
        alt=""  
        title="HELLO" 
        width="70" 
        height="70"
        style=" margin:30px 0 10px 0;"
        />
        <span style="margin-top:20px; font-size:20px; font-weight:500;">(2/2)</span>
        </div>
        </div>
      </div>
      </body>
      <style>
      @page print {
          .pagebreak { break-before: page; }
      }
      @media print {
          .pagebreak { break-before: page; }
      }
      @page print {
          .pagebreak { page-break-before: always; }
      }
      @media print {
          .pagebreak { break-before: always; }
      }
      </style>
      </html>
    
      `
      : ` <div style="width: 300px; padding: 10px; border: 1px solid #000; display:flex; flex-direction:column;">
    <h1 style="text-align: center; font-size: 1.2rem; font-weight: bold; margin: 0 0 10px;">Ticket</h1>
    <div style="margin-bottom: 10px;">
              <p style="font-size: 0.9rem; margin: 0;">Adresse: rue ibn kholdoun </p>
              <p style="font-size: 0.9rem; margin: 0;">Tel: +523 12323 123 </p>
              <p style="font-size: 0.9rem; margin: 0;">N° SIRET: qsd123 </p>
              <h1 style="text-align: center;  font-weight: bold; margin: 18px 0;">Payée</h1>
              <p style="font-size: 0.9rem; margin: 0;">Nom du client: mohamed </p>
              <p style="font-size: 0.9rem; margin: 0;">N° de commande: #123123545DF </p>
              ${
                tableNumber
                  ? `<p style="font-size: 0.9rem; margin: 0;">N° de table: ${tableNumber}</p>:`
                  : ""
              }
              <p style="font-size: 0.9rem; margin: 0;">Nom du caissier: ${
                user?.fullname
              } </p>
              <p style="font-size: 0.9rem; margin: 0;">Type de commande: ${ordersType} </p>
              <p style="font-size: 0.9rem; margin: 0;">Mode du paiement: ${
                paymentMethod === "other" ? "autre" : "payement via card"
              } </p>
              <hr style="border: none; border-top: 1px dashed #000; margin: 15px 0;">

              ${orders
                ?.map(
                  (order) => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <p style="font-size: 0.9rem; margin: 0;">${order.name} </p>
              <p style="font-size: 0.9rem; margin: 0;">${order.quantity}</p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <p style="font-size: 0.8rem; margin: 0 0 0 20px;">Prix par pièce:</p>
              <p style="font-size: 0.8rem; margin: 0;">${order.price} €</p>
            </div>
            `
                )
                .join("")}
                </div>
                <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
    <div style="display: flex; flex-direction:column; justify-content: space-between; margin-bottom: 5px;">
          ${
            paymentMethod === "other"
              ? `
              <div style="display: flex; margin-bottom:5px; justify-content: space-between; ">
              <p style="font-size: 0.8rem; margin: 0;">montant payé en éspèces:</p>
              <p style="font-size: 0.8rem; margin: 0; margin-right:8px">${cashPayment} €</p>
              </div>
              <div style="display: flex; justify-content: space-between;">
              <p style="font-size: 0.8rem; margin: 0;">montant payé via carte:</p>
              <p style="font-size: 0.8rem; margin: 0;margin-right:8px">${cardPayment} €</p>
              
              `
              : `
                <div style="display: flex; margin-bottom:5px; justify-content: space-between; ">
              <p style="font-size: 0.8rem; margin: 0;">montant payé en éspèces:</p>
              <p style="font-size: 0.8rem; margin: 0; margin-right:8px">${clientMoney} €</p>
              </div>
              
                `
          }
          </div>
              <div>
              <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <p style="font-size: 0.8rem; margin: 0;">Total Payé:</p>
              <p style="font-size: 0.8rem; margin: 0;">${
                paymentMethod === "cash"
                  ? clientMoney
                  : parseFloat(cardPayment) + parseFloat(cashPayment)
              } €</p>
              </div>
              <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <p style="font-size: 0.8rem; margin: 0;">TVA (5%):</p>
              <p style="font-size: 0.8rem; margin: 0;">${(total * 0.05).toFixed(
                2
              )} €</p>
            </div>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">Total (Including TVA):</p>
      <p style="font-size: 0.9rem; margin: 0; font-weight: bold;">${totalWithTVA.toFixed(
        2
      )} €</p>
    </div>
    <div>
    <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
    <p style="font-size: 0.8rem; margin: 0;">Reste a Payé:</p>
    <p style="font-size: 0.8rem; margin: 0;">${
      paymentMethod === "cash"
        ? totalWithTVA.toFixed(2) - clientMoney
        : totalWithTVA.toFixed(2) -
          (parseFloat(cardPayment) + parseFloat(cashPayment))
    } €</p>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; margin-top:20px;">
    <p style="text-align: right; margin: 0 0 10px;">Date: ${formattedDate}</p>
    <p>Mot de passe WIFI: 1231931239</p>
    <p style="text-align:center;">Bonne appétit,<br/> Merci pour votre visite</p>
    <img id='barcode' 
    src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld&amp;size=100x100" 
    alt=""  
    title="HELLO" 
    width="70" 
    height="70"
    style=" margin:30px 0 10px 0;"
    />
    </div>
  </div>`;
    try {
      const { uri } = await Print.printToFileAsync({ html: ticketHTML });
      await Print.printAsync({ uri });

      setIsOrdersViewOpen(false);
      setOrders([]);
    } catch (error) {
      console.error("Failed to print ticket:", error);
    }
  };

  const handleVerifyOrder = () => {
    if (!clientMoney && paymentMethod === "cash")
      return alert("Veuillez entrer l'argent du client");
    if (
      parseFloat(clientMoney) < parseFloat(total) &&
      paymentMethod === "cash"
    ) {
      return alert("L'argent du client est insuffisant");
    }

    dispatch(
      CreateOrder(
        setIsOrdersViewOpen,
        setOrders,
        orders,
        total,
        handlePrintTicket,
        mode
      )
    );
  };

  const handleVerifyOrderOtherPay = () => {
    if (
      parseFloat(cashPayment + cardPayment) < parseFloat(total) &&
      paymentMethod === "other"
    ) {
      return alert("L'argent du client est insuffisant");
    }
    setShow(false);
  };

  return (
    <View className="rounded-2xl flex-[0.4] h-full p-8 bg-black">
      <Modal
        isVisible={show}
        coverScreen={false}
        style={{ margin: 0 }}
        onBackdropPress={() => setShow(false)}
      >
        <View className="rounded-2xl flex-[0.5] h-full p-8 bg-black items-center">
          <KeyboardWrapper>
            <>
              <Text className="text-xl font-bold text-white self-center">
                Autre Payment
              </Text>
              <View style={{ marginVertical: 20 }} />
              <Text className="flex-1 text-l font-regular text-white">
                Montant(via card):
              </Text>
              <TextInput
                placeholder="montant via carte bancaire"
                placeholderTextColor={"#8d9195"}
                keyboardType="decimal-pad"
                onChangeText={(t) => setCardPayment(t)}
                className="bg-input h-14 w-full px-3 text-white rounded-lg"
              />
              <View style={{ marginVertical: 20 }} />
              <Text className="flex-1 text-l font-regular text-white">
                Montant(éspèces):
              </Text>
              <TextInput
                placeholder="montant en éspèces"
                placeholderTextColor={"#8d9195"}
                keyboardType="decimal-pad"
                onChangeText={(t) => setCashPayment(t)}
                className="bg-input h-14 w-full px-3 text-white rounded-lg"
              />
              <View style={{ marginVertical: 20 }} />
              <TouchableOpacity
                activeOpacity={0.9}
                className="bg-primary p-4 mt-4 rounded-lg"
                onPress={handleVerifyOrderOtherPay}
              >
                <Text className="text-lg font-bold text-center text-white">
                  CONFIRMER
                </Text>
              </TouchableOpacity>
            </>
          </KeyboardWrapper>
        </View>
      </Modal>
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl font-bold text-white">Commandes</Text>
      </View>

      <View className="border-lightGray/10 flex-row pb-3 mt-10 border-b">
        <Text className="flex-1 text-2xl font-semibold text-white">Item</Text>
        <Text className="text-2xl font-semibold text-white">Qty</Text>
        <Text className="w-20 text-2xl font-semibold text-center text-white">
          Price
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      >
        <View className="mt-4 space-y-8">
          {orders.map((order, i) => (
            <View key={i} className="flex-row justify-between">
              <View className="flex-1 space-y-4">
                <View className="flex-row justify-between">
                  <View className="flex-row gap-4">
                    <Image
                      source={{ uri: `${UPLOAD_URL}/${order.image}` }}
                      className="w-14 h-14 rounded-md"
                    />

                    <View>
                      <Text className="text-lg font-bold text-white">
                        {order.name}
                      </Text>
                      <Text className="text-lightGray">{order.price}$</Text>
                    </View>
                  </View>
                  <TextInput
                    value={order.quantity.toString()}
                    onChangeText={(text) => {
                      setOrders((prev) => {
                        const updatedOrders = prev.map((item) => {
                          if (item.id === order.id) {
                            return {
                              ...item,
                              quantity: text,
                            };
                          }
                          return item;
                        });
                        return updatedOrders;
                      });
                    }}
                    className="bg-input w-14 h-14 text-xl text-center text-white rounded-lg"
                  />
                </View>

                <TextInput
                  placeholder="Order Note..."
                  placeholderTextColor={"#8d9195"}
                  value={order?.note}
                  onChangeText={(text) => {
                    setOrders((prev) => {
                      const updatedOrders = prev.map((item) => {
                        if (item.id === order.id) {
                          return {
                            ...item,
                            note: text,
                          };
                        }
                        return item;
                      });
                      return updatedOrders;
                    });
                  }}
                  className="bg-input h-14 w-full px-3 text-white rounded-lg"
                />
              </View>
              <View className="items-center justify-around w-20">
                <Text className="text-lg font-bold text-center text-white">
                  {order.price * parseInt(order.quantity) || "..."} $
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setOrders(orders.filter((item) => order.id !== item.id));
                  }}
                  className="border-primary items-center justify-center p-3 border rounded-lg"
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="mt-auto">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-lg font-bold text-white mb-1">
              Méthode de paiement
            </Text>
            <Pressable
              onPress={() => {
                setShow(true), setPaymentMethod("other");
              }}
            >
              <Text className="text-lg font-bold text-white">Autre ?</Text>
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPaymentMethod("cash")}
              className={`${
                paymentMethod === "cash" ? "bg-primary" : "bg-lightGray/10"
              } items-center justify-center w-14 h-14 rounded-lg`}
            >
              <MaterialCommunityIcons
                name="cash"
                size={24}
                color={paymentMethod === "cash" ? "white" : colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setPaymentMethod("card")}
              className={`${
                paymentMethod === "card" ? "bg-primary" : "bg-lightGray/10"
              } items-center justify-center w-14 h-14 rounded-lg ml-4`}
            >
              <MaterialCommunityIcons
                name="credit-card"
                size={24}
                color={paymentMethod === "card" ? "white" : colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {paymentMethod === "cash" && (
          <TextInput
            keyboardType="numeric"
            placeholder="Argent du client"
            placeholderTextColor={"#8d9195"}
            className="bg-input h-14 w-full px-3 mb-4 text-white rounded-lg"
            onChangeText={(text) => {
              setClientMoney(text);
            }}
          />
        )}
        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-lg font-bold text-white">Diviser</Text>
          <CheckBox value={checked} onValueChange={setChecked} />
        </View>
        <View className="flex-row items-center justify-between mt-4">
          <Text className="text-lg font-bold text-white">Total</Text>
          <Text className="text-lg font-bold text-white">${total}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-primary p-4 mt-4 rounded-lg"
          onPress={() => {
            handleVerifyOrder();
          }}
        >
          <Text className="text-lg font-bold text-center text-white">
            Vérifier
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrdersView;
