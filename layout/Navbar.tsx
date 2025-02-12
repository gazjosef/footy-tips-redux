import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/authContext";

const NavbarContainer = styled.nav`
  width: 100%;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

interface DropdownProps {
  isOpen: boolean;
}

const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  padding: 0.5rem;
  width: 150px;
  z-index: 10;

  button {
    width: 100%;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    text-align: left;
    &:hover {
      background: ${({ theme }) => theme.hover};
    }
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <NavbarContainer>
      <MobileMenuButton
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </MobileMenuButton>
      <NavLinks style={{ display: menuOpen ? "flex" : "none" }}>
        <a href="/tips">Tips</a>
        <a href="/leaderboard">Leaderboard</a>
      </NavLinks>
      {user ? (
        <UserMenu>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {user.name || "Profile"}
          </button>
          <Dropdown isOpen={dropdownOpen}>
            <button onClick={signOut}>Logout</button>
          </Dropdown>
        </UserMenu>
      ) : (
        <a href="/login">Login</a>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
