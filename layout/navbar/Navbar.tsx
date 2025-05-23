import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../../src/context/authContext";

const NavbarContainer = styled.nav`
  width: 100%;
  max-width: 120rem;
  height: 8rem;
  background: orangered;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
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

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 5px;
    width: 200px;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
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
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavbarContainer>
      {/* Mobile Menu Button */}
      <MobileMenuButton
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </MobileMenuButton>

      {/* Navigation Links */}
      <NavLinks isOpen={menuOpen}>
        <a href="/tips">Tips</a>
        <a href="/leaderboard">Leaderboard</a>
      </NavLinks>

      {/* User Menu */}
      {user ? (
        <UserMenu ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {user.email || "Profile"}
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
