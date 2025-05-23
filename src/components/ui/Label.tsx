import styled from "styled-components";

const Label = styled.label`
  position: absolute;
  left: 10px;
  top: 12px;
  font-size: 14px;
  color: #aaa;
  transition: 0.3s ease;
  pointer-events: none;
  input:focus + &,
  input:not(:placeholder-shown) + & {
    top: -10px;
    font-size: 12px;
    color: #007bff;
  }
`;

export default Label;
