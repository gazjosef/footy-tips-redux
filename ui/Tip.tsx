import styled from "styled-components";

export const TippingContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

export const FixtureCard = styled.div`
  background: #fff;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  text-align: center;
`;

export const TeamsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;

export const TeamLabel = styled.label`
  width: 10rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  cursor: pointer;
`;

export const TeamLogo = styled.img`
  width: 60px;
  height: 45px;
  margin-bottom: 5px;
`;

export const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  font-size: 12px;
  color: #666;
  text-align: center;
`;

export const RadioInput = styled.input`
  margin-top: 5px;
`;
