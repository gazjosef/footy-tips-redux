import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";
import styled from "styled-components";

// Initialize Supabase
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;
const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;
const Th = styled.th`
  background: #222;
  color: white;
  padding: 10px;
`;
const Td = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

// Fetch function
const fetchFixtures = async (round: string) => {
  const { data, error } = await supabase
    .from("Fixtures")
    .select(
      "id, kickoff_time, venue, home_team, home_score, away_team, away_score"
    )
    .eq("round", round);

  if (error) throw new Error(error.message);
  return data;
};

const Fixtures = () => {
  const [selectedRound, setSelectedRound] = useState("1");

  const {
    data: fixtures,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fixtures", selectedRound],
    queryFn: () => fetchFixtures(selectedRound),
  });

  return (
    <Container>
      <h2>Footy Fixtures</h2>
      <Select
        value={selectedRound}
        onChange={(e) => setSelectedRound(e.target.value)}
      >
        {[...Array(10).keys()].map((r) => (
          <option key={r + 1} value={r + 1}>
            Round {r + 1}
          </option>
        ))}
      </Select>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {fixtures && (
        <Table>
          <thead>
            <tr>
              <Th>Kickoff</Th>
              <Th>Venue</Th>
              <Th>Home</Th>
              <Th>Score</Th>
              <Th>Away</Th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((game) => (
              <tr key={game.id}>
                <Td>{new Date(game.kickoff_time).toLocaleString()}</Td>
                <Td>{game.venue}</Td>
                <Td>{game.home_team}</Td>
                <Td>
                  {game.home_score} - {game.away_score}
                </Td>
                <Td>{game.away_team}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Fixtures;
