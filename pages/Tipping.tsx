import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

// UI
import TippingContainer from "../ui/TippingContainer";
import Select from "../ui/Select";
import { Table, Th, Td } from "../ui/Table";

// Initialize Supabase
const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
    <TippingContainer>
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

              <Th>Away</Th>
            </tr>
          </thead>

          <tbody>
            {fixtures.map((game) => (
              <tr key={game.id}>
                <Td>{new Date(game.kickoff_time).toLocaleString()}</Td>

                <Td>{game.venue}</Td>

                <Td>
                  <label>
                    <input
                      type="radio"
                      name={`tip-${game.id}`}
                      value={game.home_team}

                      // checked={selectedTips[game.id] === game.home_team}

                      // onChange={() => handleSelection(game.id, game.home_team)}
                    />

                    {game.home_team}
                  </label>
                </Td>

                <Td>
                  <label>
                    <input
                      type="radio"
                      name={`tip-${game.id}`}
                      value={game.away_team}

                      // checked={selectedTips[game.id] === game.away_team}

                      // onChange={() => handleSelection(game.id, game.away_team)}
                    />

                    {game.away_team}
                  </label>
                </Td>

                {/* <Td>
                  <button onClick={() => submitTip(game.id)}>Submit Tip</button>
                </Td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </TippingContainer>
  );
};

export default Fixtures;
