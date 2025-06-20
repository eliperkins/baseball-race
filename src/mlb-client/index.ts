import createClient from "openapi-fetch";
import type { paths } from "./schema";
import { AMERICAN_LEAGUE_ID, NATIONAL_LEAGUE_ID } from "../constants";

export const fetchTeams = async () => {
  const client = createClient<paths>({
    baseUrl: "https://statsapi.mlb.com/api/",
  });

  const { data } = await client.GET("/v1/teams", {
    params: { query: { sportId: 1, season: "2025" } },
  });

  if (data == null) {
    throw new Error("Response data is null");
  }

  return data.teams;
};

export const fetchStandingsForLeague = async (date: Date, leagueId: number) => {
  const client = createClient<paths>({
    baseUrl: "https://statsapi.mlb.com/api/",
  });

  const { data } = await client.GET("/v1/standings", {
    params: {
      query: {
        leagueId,
        season: "2025",
        date: date.toISOString().split("T")[0],
      },
    },
  });

  if (data == null) {
    throw new Error("Response data is null");
  }

  return data.records;
};

export const fetchStandings = async (date: Date) => {
  return await Promise.all([
    fetchStandingsForLeague(date, AMERICAN_LEAGUE_ID),
    fetchStandingsForLeague(date, NATIONAL_LEAGUE_ID),
  ]).then(([americanStandings, nationalStandings]) => {
    return [...americanStandings, ...nationalStandings];
  });
};
