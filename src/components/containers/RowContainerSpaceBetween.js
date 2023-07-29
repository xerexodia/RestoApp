//!This container give a row flex display of his childrens and space between them
import React from "react";
import styled from "styled-components/native";
const StyledView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  @media (min-width: 375px) {
    flex-direction: column;
  }
`;
const RowContainer = (props) => {
  return <StyledView {...props}>{props.children}</StyledView>;
};

export default RowContainer;
