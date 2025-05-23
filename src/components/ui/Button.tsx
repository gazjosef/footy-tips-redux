import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background-color: #007bff;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  margin-top: 15px;

  color: white;
  font-size: 16px;

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
