import { useEffect, useState } from "react";
import {
  useQuery,
  // QueryKey
} from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

// UI components
import { SelectBox, Select } from "../components/ui/Select";
import Button from "../components/ui/Button";
import PlaceCentre from "../components/ui/PlaceCentre";

// Initialise Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY!;
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
  const rounds = data?.map((item) => item.round) || [];
  return [...new Set(rounds)];
};

const fetchFixtures = async (round: string): Promise<Fixture[]> => {
  const { data, error } = await supabase
    .from("Fixtures")
    .select("*")
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

const getTeamLogoUrl = (teamName: string) => {
  const formatted = teamName.toLowerCase().replace(/\s+/g, "-");
  return `${SUPABASE_URL}/storage/v1/object/public/logo/${formatted}.png`;
};

const Fixtures = () => {
  const [selectedRound, setSelectedRound] = useState("");
  const [selectedTips, setSelectedTips] = useState<Record<number, string>>({});

  const {
    data: rounds,
    isLoading: roundsLoading,
    error: roundsError,
  } = useQuery<string[], Error>({
    queryKey: ["rounds"],
    queryFn: fetchRounds,
  });

  const {
    data: fixtures,
    isLoading: fixturesLoading,
    error: fixturesError,
  } = useQuery<Fixture[], Error>({
    queryKey: ["fixtures", selectedRound],
    queryFn: () => fetchFixtures(selectedRound),
    enabled: !!selectedRound,
  });

  const { data: tipsData } = useQuery<Tip[], Error>({
    queryKey: ["tips"],
    queryFn: fetchTips,
  });

  useEffect(() => {
    if (rounds?.length && !selectedRound) {
      setSelectedRound(rounds[0]);
    }
  }, [rounds, selectedRound]);

  useEffect(() => {
    if (tipsData) {
      const tipsMap: Record<number, string> = {};
      tipsData.forEach((tip) => {
        tipsMap[tip.fixture_id] = tip.selected_team;
      });
      setSelectedTips(tipsMap);
    }
  }, [tipsData]);

  const handleSelection = (fixtureId: number, team: string) => {
    setSelectedTips((prev) => ({ ...prev, [fixtureId]: team }));
  };

  const submitAllTips = async () => {
    const updates = Object.entries(selectedTips).map(([id, team]) => ({
      fixture_id: Number(id),
      selected_team: team,
      updated_at: new Date().toISOString(),
    }));

    for (const tip of updates) {
      const { data: existing } = await supabase
        .from("Tips")
        .select("id")
        .eq("fixture_id", tip.fixture_id)
        .single();

      if (existing) {
        await supabase.from("Tips").update(tip).eq("id", existing.id);
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
      <div className="max-w-[800px] mx-auto p-5">
        {roundsLoading && <p>Loading rounds...</p>}
        {roundsError && <p>Error loading rounds: {roundsError.message}</p>}

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Select Round</h3>
          <SelectBox>
            <Select
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
            >
              <option value="" disabled>
                Select a Round
              </option>
              {rounds?.map((r) => (
                <option key={r} value={r}>
                  Round {r}
                </option>
              ))}
            </Select>
          </SelectBox>
        </div>

        {fixturesLoading && <p>Loading fixtures...</p>}
        {fixturesError && (
          <p>Error loading fixtures: {fixturesError.message}</p>
        )}

        {fixtures &&
          fixtures.map((game) => (
            <div
              key={game.id}
              className="bg-white mb-4 p-4 border border-gray-300 rounded-lg shadow flex items-center justify-between gap-8 text-center"
            >
              <label className="cursor-pointer w-[30rem] flex items-center justify-start gap-8">
                <input
                  type="radio"
                  name={`tip-${game.id}`}
                  value={game.home_team}
                  checked={selectedTips[game.id] === game.home_team}
                  onChange={() => handleSelection(game.id, game.home_team)}
                />
                <img
                  className="w-[60px] h-[45px]"
                  src={getTeamLogoUrl(game.home_team)}
                  alt={game.home_team}
                />
                <span>{game.home_team}</span>
              </label>

              <div className="w-[20rem] flex flex-col gap-1 text-xs text-gray-600 text-center">
                <span>
                  {new Date(game.date).toLocaleDateString("en-AU", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
                <span>
                  {new Date(`1970-01-01T${game.time}`).toLocaleTimeString(
                    "en-AU",
                    { hour: "numeric", hour12: true }
                  )}
                </span>
                <span>{game.venue}</span>
              </div>

              <label className="cursor-pointer w-[30rem] flex items-center justify-end gap-8">
                <span>{game.away_team}</span>
                <img
                  className="w-[60px] h-[45px]"
                  src={getTeamLogoUrl(game.away_team)}
                  alt={game.away_team}
                />
                <input
                  type="radio"
                  name={`tip-${game.id}`}
                  value={game.away_team}
                  checked={selectedTips[game.id] === game.away_team}
                  onChange={() => handleSelection(game.id, game.away_team)}
                />
              </label>
            </div>
          ))}

        <Button
          onClick={submitAllTips}
          disabled={Object.keys(selectedTips).length === 0}
        >
          Submit All Tips
        </Button>
      </div>
    </PlaceCentre>
  );
};

export default Fixtures;
