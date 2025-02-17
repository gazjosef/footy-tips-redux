import styled from "styled-components";

interface TeamLabelProps {
  justify?:
    | "flex-start"
    | "center"
    | "space-between"
    | "space-around"
    | "flex-end";
}

export const TippingContainer = styled.div`
  width: 800px;
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

export const TeamLabel = styled.label<TeamLabelProps>`
  cursor: pointer;
  width: 30rem;

  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justify || "space-between"};
  gap: 2rem;
`;

export const TeamLogo = styled.img`
  width: 60px;
  height: 45px;
`;

export const MatchInfo = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 5px;

  font-size: 12px;
  color: #666;
  text-align: center;
`;
