import React from "react";
import { useAuth } from "../context/authContext";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1e2f; /* Dark theme background */
  padding: 12px 24px;
  color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffcc00; /* Tipping app theme color */
  text-decoration: none;
  cursor: pointer;
`;

const AuthButton = styled.button`
  background: #ffcc00;
  color: #1e1e2f;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #e6b800;
  }
`;

const LoginLink = styled.a`
  background: transparent;
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <NavbarContainer>
      <Logo href="/">🏆 Tipping App</Logo>
      {user ? (
        <AuthButton onClick={signOut}>Logout</AuthButton>
      ) : (
        <LoginLink href="/login">Login</LoginLink>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
