import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@supabase/supabase-js";

// UI
import {
  TippingContainer,
  FixtureCard,
  TeamLabel,
  TeamLogo,
  MatchInfo,
} from "../ui/Tip";
import { SelectBox, Select } from "../ui/Select";
import Button from "../ui/Button";
// import { Table, Th, Td, GameLabel, GameInfo } from "../ui/Table";
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

const getTeamLogoUrl = (teamName: string) => {
  // Convert team name to lowercase and replace spaces with hyphens
  const formattedName = teamName.toLowerCase().replace(/\s+/g, "-");
  return `${SUPABASE_URL}/storage/v1/object/public/logo/${formattedName}.png`;
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
        {roundsLoading && <p>Loading rounds...</p>}
        {roundsError && <p>Error loading rounds: {roundsError.message}</p>}
        <SelectBox>
          <h3>Select:</h3>
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
        </SelectBox>

        {fixturesLoading && <p>Loading fixtures...</p>}
        {fixturesError && (
          <p>Error loading fixtures: {fixturesError.message}</p>
        )}

        {fixtures &&
          fixtures.map((game) => (
            <FixtureCard key={game.id}>
              <TeamLabel justify="flex-start">
                <input
                  type="radio"
                  name={`tip-${game.id}`}
                  value={game.home_team}
                  checked={selectedTips[game.id] === game.home_team}
                  onChange={() => handleSelection(game.id, game.home_team)}
                />
                <TeamLogo
                  src={getTeamLogoUrl(game.home_team)}
                  alt={game.home_team}
                />

                <span>{game.home_team}</span>
              </TeamLabel>
              <MatchInfo>
                <span>
                  {new Date(`1970-01-01T${game.time}`).toLocaleTimeString(
                    "en-GB",
                    { hour: "numeric", hour12: true }
                  )}
                </span>
                <span>
                  {new Date(game.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
                <span>{game.venue}</span>
              </MatchInfo>
              <TeamLabel justify="flex-end">
                <span>{game.away_team}</span>
                <TeamLogo
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
              </TeamLabel>
            </FixtureCard>
          ))}

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
