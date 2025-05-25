import styled from "styled-components";

export const NavbarContainer = styled.nav`
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

export const NavLinks = styled.ul<{ isOpen: boolean }>`
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

export const UserMenu = styled.div`
  position: relative;
`;

export const Dropdown = styled.div<{ isOpen: boolean }>`
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

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
