import { google } from "googleapis";
import "dotenv/config";

export const createAuth = async () => {
  const credentialString = process.env.GOOGLE_CREDENTIAL_STRING;
  if (!credentialString) {
    throw new Error("GOOGLE_CREDENTIAL_STRING environment variable is not set");
  }
  const base64Decoded = Buffer.from(credentialString, "base64").toString(
    "utf8",
  );
  return new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    credentials: JSON.parse(base64Decoded),
  });
};
