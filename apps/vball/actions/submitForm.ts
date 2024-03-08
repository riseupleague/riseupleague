"use server";

import { google } from "googleapis";
import { revalidatePath } from "next/cache";

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

	const { data } = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.NEWSLETTER_SPREADSHEET_ID,
		range: "Sheet1!A2:C",
	});

	if (
		data.values.filter(
			(storedEmail) => storedEmail.toString() === email.toString()
		).length > 0
	) {
		return {
			variant: "destructive",
			title: "Oops!",
			description: "Email already exists! Please enter a different email.",
		};
	}

	await sheets.spreadsheets.values.append({
		spreadsheetId: process.env.NEWSLETTER_SPREADSHEET_ID,
		range: "Sheet1!A2:C",
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[email]],
		},
	});

	revalidatePath("/");

	return {
		variant: "success",
		title: "Success!",
		description: `Your email ${email} has been added to our newsletter.`,
	};
};

export default submitForm;
