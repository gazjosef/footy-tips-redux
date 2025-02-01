import styled from "styled-components";

const InputField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  input {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: all 0.3s ease;
    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
`;

export default InputField;
