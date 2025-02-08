import styled from "styled-components";

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Button;
