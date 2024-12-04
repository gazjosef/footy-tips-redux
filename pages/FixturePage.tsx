import React from "react";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabaseClient";

const fetchFixtures = async () => {
  const { data, error } = await supabase.from("fixtures").select("*");
  if (error) throw new Error(error.message);
  return data;
};

const FixturesPage = () => {
  const {
    data: fixtures,
    isLoading,
    error,
  } = useQuery(["fixtures"], fetchFixtures);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fixtures</h1>
      {fixtures?.map((fixture) => (
        <div key={fixture.id}>
          <p>
            {fixture.homeTeam} vs {fixture.awayTeam}
          </p>
          <p>{fixture.date}</p>
        </div>
      ))}
    </div>
  );
};

export default FixturesPage;
