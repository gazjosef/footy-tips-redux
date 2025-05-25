import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/authContext";
import {
  Dropdown,
  MobileMenuButton,
  NavbarContainer,
  NavLinks,
  UserMenu,
} from "./Navbar.styles";

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
