// import React from "react";
import Navbar from "../navbar/Navbar";
import { Wrapper } from "../../src/styles/Layout.styles";
import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 8rem;
  background-color: royalblue;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Wrapper>
        <Navbar />
      </Wrapper>
    </HeaderContainer>
  );
};
export default Header;
