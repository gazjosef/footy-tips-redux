import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

// UI
import TippingContainer from "../ui/TippingContainer";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { Table, Th, Td } from "../ui/Table";

// Initialize Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Fixture {
  id: number;
  kickoff_time: string;
  venue: string;
  home_team: string;
  away_team: string;
}

interface Tip {
  fixture_id: number;
  selected_team: string;
}

const fetchFixtures = async (round: string): Promise<Fixture[]> => {
  const { data, error } = await supabase
    .from("Fixtures")
    .select("id, kickoff_time, venue, home_team, away_team")
    .eq("round", round);

  if (error) throw new Error(error.message);
  return data || [];
};

const fetchTips = async (): Promise<Tip[]> => {
  const { data, error } = await supabase
    .from("Tips")
    .select("fixture_id, selected_team");
  if (error) throw new Error(error.message);
  return data || [];
};

const Fixtures = () => {
  const [selectedRound, setSelectedRound] = useState<string>("1");
  const [selectedTips, setSelectedTips] = useState<Record<number, string>>({});

  const {
    data: fixtures,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fixtures", selectedRound],
    queryFn: () => fetchFixtures(selectedRound),
  });

  const { data: tipsData } = useQuery({
    queryKey: ["tips"],
    queryFn: fetchTips,
  });

  useEffect(() => {
    if (tipsData) {
      const prefilledTips: Record<number, string> = {};
      tipsData.forEach((tip) => {
        prefilledTips[tip.fixture_id] = tip.selected_team;
      });
      setSelectedTips(prefilledTips);
    }
  }, [tipsData]);

  const handleSelection = (fixtureId: number, team: string) => {
    setSelectedTips((prev) => ({ ...prev, [fixtureId]: team }));
  };

  const submitAllTips = async () => {
    const updates = Object.entries(selectedTips).map(
      ([fixtureId, selectedTeam]) => ({
        fixture_id: Number(fixtureId),
        selected_team: selectedTeam,
        updated_at: new Date().toISOString(),
      })
    );

    for (const tip of updates) {
      const { data: existingTip } = await supabase
        .from("Tips")
        .select("id")
        .eq("fixture_id", tip.fixture_id)
        .single();

      if (existingTip) {
        await supabase.from("Tips").update(tip).eq("id", existingTip.id);
      } else {
        await supabase
          .from("Tips")
          .insert([
            { ...tip, user_id: null, created_at: new Date().toISOString() },
          ]);
      }
    }
  };

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
                      checked={selectedTips[game.id] === game.home_team}
                      onChange={() => handleSelection(game.id, game.home_team)}
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
                      checked={selectedTips[game.id] === game.away_team}
                      onChange={() => handleSelection(game.id, game.away_team)}
                    />
                    {game.away_team}
                  </label>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Button
        onClick={submitAllTips}
        disabled={Object.keys(selectedTips).length === 0}
      >
        Submit All Tips
      </Button>
    </TippingContainer>
  );
};

export default Fixtures;
