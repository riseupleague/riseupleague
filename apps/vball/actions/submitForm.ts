"use server";

import { google } from "googleapis";

const submitForm = async (e: { email: FormDataEntryValue }) => {
	const { email } = e;
	const auth = new google.auth.GoogleAuth({
		credentials: {
			client_email: process.env.NEWSLETTER_CLIENT_EMAIL,
			client_id: process.env.NEWSLETTER_CLIENT_ID,
			private_key: process.env.NEWSLETTER_PRIVATE_KEY,
		},
		scopes: [
			"https://www.googleapis.com/auth/drive",
			"https://www.googleapis.com/auth/drive.file",
			"https://www.googleapis.com/auth/spreadsheets",
		],
	});
	const sheets = google.sheets({ version: "v4", auth });

	const response = await sheets.spreadsheets.values.append({
		spreadsheetId: process.env.NEWSLETTER_SPREADSHEET_ID,
		range: "Sheet1!A2:C",
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[email]],
		},
	});
};

export default submitForm;
