import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

// UI
import TippingContainer from "../ui/TippingContainer";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { Table, Th, Td } from "../ui/Table";
import PlaceCentre from "../ui/PlaceCentre";

// Initialize Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Fixture {
  id: number;
  round: string;
  date: string;
  time: string;
  venue: string;
  home_team: string;
  away_team: string;
}

interface Tip {
  fixture_id: number;
  selected_team: string;
}

const fetchRounds = async (): Promise<string[]> => {
  const { data, error } = await supabase.from("Fixtures").select("round");

  if (error) throw new Error(error.message);

  // Deduplicate rounds using Set
  const rounds = data?.map((item) => item.round) || [];
  const uniqueRounds = [...new Set(rounds)];

  return uniqueRounds;
};

const fetchFixtures = async (round: string): Promise<Fixture[]> => {
  const { data, error } = await supabase
    .from("Fixtures")
    .select("id, round, date, time, venue, home_team, away_team")
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

  // Fetch rounds
  const {
    data: rounds,
    isLoading: roundsLoading,
    error: roundsError,
  } = useQuery({
    queryKey: ["rounds"],
    queryFn: fetchRounds,
  });

  const {
    data: fixtures,
    isLoading: fixturesLoading,
    error: fixturesError,
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
    <PlaceCentre>
      <TippingContainer>
        <h2>Footy Fixtures</h2>

        {roundsLoading && <p>Loading rounds...</p>}
        {roundsError && <p>Error loading rounds: {roundsError.message}</p>}

        <Select
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
        >
          <option value="">Select a Round</option> {/* Default option */}
          {rounds?.map((round) => (
            <option key={round} value={round}>
              Round {round}
            </option>
          ))}
        </Select>

        {fixturesLoading && <p>Loading fixtures...</p>}
        {fixturesError && (
          <p>Error loading fixtures: {fixturesError.message}</p>
        )}

        {fixtures && (
          <Table>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Venue</Th>
                <Th>Home</Th>
                <Th>Away</Th>
              </tr>
            </thead>
            <tbody>
              {fixtures.map((game) => (
                <tr key={game.id}>
                  <Td>{game.date}</Td>
                  <Td>{game.time}</Td>
                  <Td>{game.venue}</Td>
                  <Td>
                    <label>
                      <input
                        type="radio"
                        name={`tip-${game.id}`}
                        value={game.home_team}
                        checked={selectedTips[game.id] === game.home_team}
                        onChange={() =>
                          handleSelection(game.id, game.home_team)
                        }
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
                        onChange={() =>
                          handleSelection(game.id, game.away_team)
                        }
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
    </PlaceCentre>
  );
};

export default Fixtures;
