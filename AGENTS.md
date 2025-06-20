This app is a series of GitHub Actions workflows that automate Google Sheets data. Within Google Sheets, there will be a set of players (like "Carson", "Stu", "Ryan"). Each player will pick an MLB team that will be associated with them. Those player names and their associated teams should never be edited by this app.

## Data storage

Data is stored in Google Sheets in the following format

| Player | Team ID |
|--------|------|
| Carson | 1 |
| Stu    | 2 |
| Ryan   | 3 |

| Team ID | Team Name |
|---------|-----------|
| 1       | Boston Red Sox |
| 2       | New York Yankees |
| 3       | Los Angeles Dodgers |

| Team ID | Date | Wins | Losses |
|---------|------|------|--------|
| 1       | 2025-08-01 | 80 | 60 |
| 2       | 2025-08-01 | 75 | 65 |
| 3       | 2025-08-01 | 70 | 70 |

## Daily usiness logic

Every day, the app will take a series of actions to keep the Google Sheet up to date:

1. Fetch the latest MLB standings from the official MLB API:
   - American League: https://statsapi.mlb.com/api/v1/standings?season=2025&leagueId=103
   - National League: https://statsapi.mlb.com/api/v1/standings?season=2025&leagueId=104
2. Create a new row in the "Team ID | Date | Wins | Losses" table with the current date and the latest standings data (wins & losses)

## Languages and frameworks

This project is a series of Node.js scripts that use te Google Sheets API to update the data. GitHub Actions is used to automate the daily business logic.

This project is written in TypeScript.

### Node.js

- Package manager: Yarn
- Node version: 22
- Dependencies:
  - googleapis
  - typescript

Do not use axios for any HTTP requests. Prefer the built-in `fetch` API from Node.js.

This project uses OpenAPI to generate the API client, which is located at `src/mlb-client`. The OpenAPI spec is located in `spec`.

### GitHub Actions

All actions should do the following steps:
1. Checkout the repository
2. Install dependencies for Node.js
3. `yarn install`
4. Run a Node.js script from the project

## Methodology

Don't implement more than what is needed. Favor less code over more.

Use documentation from Context7 and the `get-library-docs` tool to get up-to-date docs.
