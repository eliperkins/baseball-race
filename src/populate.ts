import { createTeams, updateStandings } from "./sheets-client";

const populate = async () => {
  await createTeams();
  await updateStandings(new Date());
};

populate();
