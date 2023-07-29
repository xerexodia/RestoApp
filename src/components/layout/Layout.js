import React from "react";
import SideHeader from "../sideHeader/SideHeader";
import styled from "styled-components/native";
import { colors } from "../colors";
import Header from "../header/Header";
import OrdersView from "../ordersView/OrdersView";
import { SafeAreaView } from "react-native-web";
const ScreenContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;
const Container = styled.View`
  height: 100%;
  flex: 1;
  background-color: ${colors.lightblack};
  flex-direction: column;
  display: flex;
  justify-content: space-between;
`;
const SideBarContainer = styled.View`
  height: 100%;
  width: 80px;
`;

const StyledView = styled.View`
  background-color: ${colors.lightblack};
  width: 100%;
  padding: 20px;
`;

const MainView = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.black};
  border-radius: 16px;
  padding: 40px;
`;

const Layout = ({
  navigation,
  headerTitle,
  date,
  children,
  searchBar,
  ordersType,
  style = {},
  setQuery,
  isOrdersViewOpen,
  tableNumber,
  orders = [],
  setOrders = () => {},
  setIsOrdersViewOpen = () => {},
}) => {
  return (
    <ScreenContainer>
      <SideBarContainer>
        <SideHeader navigation={navigation} />
      </SideBarContainer>
      <Container>
        <StyledView>
          <Header
            headerTitle={headerTitle}
            date={date}
            setQuery={setQuery}
            searchBar={searchBar}
          />
        </StyledView>
        <MainView style={style}>{children}</MainView>
      </Container>
      {isOrdersViewOpen && (
        <OrdersView
          ordersType={ordersType}
          orders={orders}
          setOrders={setOrders}
          setIsOrdersViewOpen={setIsOrdersViewOpen}
          tableNumber={tableNumber}
        />
      )}
    </ScreenContainer>
  );
};

export default Layout;
