import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../colors";
const Container = styled.View`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${colors.lightblack};
`;
const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 75%;
`;
const TextTitle = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color: ${colors.white};
  align-self: flex-start;
`;
const DateContainer = styled.Text`
  font-size: 16px;
  color: ${colors.white};
  align-self: flex-start;
`;
const SearchBarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  width: 25%;
`;
const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.input};
  height: 40px;
  width: 100%;
`;
const Header = ({ headerTitle, date, searchBar, setQuery }) => {
  const [value, setValue] = React.useState("");
  const handleOnChangeText = (text) => {
    setValue(text);
    setQuery(text);
  };

  return (
    <Container>
      <TextContainer>
        <TextTitle>{headerTitle}</TextTitle>
        {date ? (
          <DateContainer>{new Date().toDateString()}</DateContainer>
        ) : null}
      </TextContainer>
      {searchBar ? (
        <SearchBarContainer>
          <View style={styles.container}>
            <SearchContainer>
              <View style={styles.vwSearch}>
                <MaterialCommunityIcons
                  name="search-web"
                  size={20}
                  color={colors.white}
                />
              </View>

              <TextInput
                value={value}
                placeholder="Chercher"
                placeholderTextColor={colors.lightGray}
                style={styles.textInput}
                onChangeText={handleOnChangeText}
              />
              {value ? (
                <TouchableOpacity
                  onPress={() => setValue("")}
                  style={styles.vwClear}
                >
                  <MaterialCommunityIcons
                    name="delete-sweep-outline"
                    size={20}
                    color={colors.white}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.vwClear} />
              )}
            </SearchContainer>
          </View>
        </SearchBarContainer>
      ) : null}
    </Container>
  );
};
const styles = StyleSheet.create({
  vwClear: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    width: "100%",
    color: colors.lightGray,
    //change the color of the placeholder text
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    // width: 40,
    // backgroundColor: 'red'
  },
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
export default Header;
