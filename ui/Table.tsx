import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;
export const Th = styled.th`
  background: #222;
  color: white;
  padding: 10px;
`;
export const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;
export const GameLabel = styled.label`
  display: flex;
  align-items: center;
`;
export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  font-size: 10px;
`;
