import { google } from "googleapis";
import { createAuth } from "./auth";
import { fetchTeams, fetchStandings } from "./mlb-client";
import { SHEET_ID, TEAM_SHEET, TEAM_RECORDS_BY_DAY } from "./constants";

export const createTeams = async () => {
  const auth = await createAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const teams = await fetchTeams();
  const values = teams.map((team) => [team.id, team.abbreviation, team.name]);

  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range: TEAM_SHEET,
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });
};

export const updateStandings = async (date: Date) => {
  const auth = await createAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const standings = await fetchStandings(date);
  const dateString = date.toISOString().split("T")[0];
  const standingRecords = standings.flatMap((standing) =>
    standing.teamRecords.map((record) => [
      dateString,
      record.team.id,
      record.wins,
      record.losses,
    ]),
  );

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: TEAM_RECORDS_BY_DAY,
    valueInputOption: "RAW",
    requestBody: {
      values: standingRecords,
    },
  });
};
