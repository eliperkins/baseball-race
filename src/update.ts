import { updateStandings } from "./sheets-client";

const run = async () => {
  await updateStandings(new Date());
};

run();
