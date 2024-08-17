import Stripe from "stripe";
import Player from "@/api-helpers/models/Player";
import Team from "@/api-helpers/models/Team";
import User from "@/api-helpers/models/User";
import Division from "@/api-helpers/models/Division";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/api-helpers/utils";
import { google } from "googleapis";
import TournamentTeam from "@/api-helpers/models/TournamentTeam";
import TournamentDivision from "@/api-helpers/models/TournamentDivision";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Handles the POST request for the webhook.
 *
 * @param {Request} req - The request object.
 * @return {Promise<Response>} - A promise that resolves to the response.
 */
export async function POST(req: Request) {
	await connectToDatabase();

	let event: Stripe.Event;

	try {
		// 1. Retrieve the event by verifying the signature using the raw body and secret
		const body = await req.text();
		// const signature = headers().get("Stripe-Signature") ?? "";
		const signature = req.headers.get("Stripe-Signature");

		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET || ""
		);
	} catch (err) {
		return NextResponse.json(
			{
				message: `Webhook Error: ${
					err instanceof Error ? err.message : "Unknown Error"
				}`,
			},
			{ status: 400 }
		);
	}

	// 2. Handle event type (add business logic here)
	if (event.type === "checkout.session.completed") {
		const session = event.data.object;
		const metadata = JSON.parse(session.metadata.formObject);
		console.log(`💰  Payment received!`);

		if (metadata.status === "tournament") {
			console.log("metadata:", metadata);

			const tournamentDivisionId = metadata.division;
			const tournamentId = metadata.tournament;
			const tournamentDivision =
				await TournamentDivision.findById(tournamentDivisionId);

			const user = await User.findById(metadata.userId);
			console.log("tournamentDivision:", tournamentDivision);

			const team = new TournamentTeam({
				teamName: metadata.teamName,
				teamNameShort: metadata.teamNameShort,
				tournamentDivision: tournamentDivision._id,
				level: metadata.level,
				tournament: tournamentId,
				players: [],
				wins: 0,
				losses: 0,
				pointDifference: 0,
				averageStats: {
					points: 0,
					rebounds: 0,
					assists: 0,
					blocks: 0,
					steals: 0,
					threesMade: 0,
					twosMade: 0,
					freeThrowsMade: 0,
				},
				teamCaptain: metadata.playerName,
				instagram: metadata.instagram || "",
				phoneNumber: metadata.phoneNumber,
			});

			const savedTeam = await team.save();
			console.log("savedTournamentTeam:", savedTeam);
			tournamentDivision.tournamentTeams =
				tournamentDivision.tournamentTeams.concat(savedTeam._id);
			user.tournament = user.tournament.concat(savedTeam._id);
			const savedDivision = await tournamentDivision.save();
			const savedUser = await user.save();
			console.log("savedUser:", savedUser);

			console.log("savedTournamentDivision:", savedDivision);
		} else {
			if (metadata.status === "freeAgent") {
				const updatedUser = await User.findOne({
					email: metadata.email,
				}).populate({
					path: "basketball",
					select: "playerName season freeAgent",
				});

				const freeAgentExist = updatedUser.basketball.find((player) => {
					if (player.season.toString() === metadata.season) {
						return player.freeAgent;
					}
				});
				if (!freeAgentExist) {
					let registeredPlayer;
					if (metadata.payment === "four") {
						registeredPlayer = new Player({
							freeAgent: metadata.freeAgent,
							customerId: session.customer,
							season: metadata.season,
							playerName: metadata.playerName,
							instagram: metadata.instagram,
							agreeToRefundPolicy: metadata.agreeToRefundPolicy,
							agreeToTerms: metadata.agreeToTerms,
							receiveNews: metadata.receiveNews,
							user: updatedUser._id,
							averageStats: {
								points: 0,
								rebounds: 0,
								assists: 0,
								blocks: 0,
								steals: 0,
								threesMade: 0,
								twosMade: 0,
								freeThrowsMade: 0,
							},
						});
					} else {
						registeredPlayer = new Player({
							freeAgent: metadata.freeAgent,
							season: metadata.season,
							playerName: metadata.playerName,
							instagram: metadata.instagram,
							jerseyName: metadata.jerseyName,
							agreeToRefundPolicy: metadata.agreeToRefundPolicy,
							agreeToTerms: metadata.agreeToTerms,
							receiveNews: metadata.receiveNews,
							user: updatedUser._id,
							averageStats: {
								points: 0,
								rebounds: 0,
								assists: 0,
								blocks: 0,
								steals: 0,
								threesMade: 0,
								twosMade: 0,
								freeThrowsMade: 0,
							},
						});
					}

					await registeredPlayer.save();
					console.log("Registered player:", registeredPlayer);
					// Handle the rest of the code based on the existingPlayer
					updatedUser.basketball = updatedUser.basketball.concat(
						registeredPlayer._id
					);

					await updatedUser.save();

					if (metadata.payment === "four") {
						let schedule = await stripe.subscriptionSchedules.create({
							from_subscription: session.subscription as string,
						});

						const phases = schedule.phases.map((phase) => ({
							start_date: phase.start_date,
							end_date: phase.end_date,
							items: phase.items,
						}));

						// const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
						// 	[
						// 		...phases.map((phase) => ({
						// 			...phase,
						// 			items: phase.items.map((item) => ({
						// 				price: "price_1OAiUpLNj0EwRSePyJXX2I8C",
						// 				quantity: 1,
						// 			})),
						// 		})),
						// 		{
						// 			items: [
						// 				{
						// 					price: "price_1OAiUpLNj0EwRSePyJXX2I8C",
						// 					quantity: 1,
						// 				} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
						// 			],
						// 			iterations: 5,
						// 		},
						// 	];

						const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
							[
								{
									items: [
										{
											price: metadata.firstInstalmentPriceId, // Initial $25 payment
											quantity: 1,
										},
									],
									start_date: schedule.phases[0].start_date,
									end_date: schedule.phases[0].end_date,
								},
								{
									items: [
										{
											price: metadata.regularPriceInstalmentId, // $85 installment price ID
											quantity: 1,
										},
									],
									start_date: schedule.phases[0].end_date,
									iterations: 3,
								},
							];

						schedule = await stripe.subscriptionSchedules.update(schedule.id, {
							end_behavior: "cancel",
							phases: updatedPhases,
						});
					}
				}
			}

			if (metadata.status === "createTeam" && metadata.teamName !== "") {
				console.log("Step 1: Starting createTeam process");
				console.log("metadata:", metadata);
				const updatedUser = await User.findById(metadata.userId);
				console.log("Step 2: Fetched updatedUser:", updatedUser);

				const selectedDivision = await Division.findById(metadata.division);
				console.log("Step 3: Fetched selectedDivision:", selectedDivision);
				// Update team
				const divisionToJoin = await Division.findOne({
					_id: selectedDivision._id.toString(),
				}).populate({
					path: "teams",
					select: "teamName",
				});
				console.log(
					"Step 4: Fetched and populated divisionToJoin:",
					divisionToJoin
				);

				const teamExistInDivision = divisionToJoin.teams.find((team) => {
					return team.teamName === metadata.teamName;
				});
				console.log(
					"Step 5: Checked if team exists in division:",
					teamExistInDivision
				);

				if (!teamExistInDivision) {
					console.log(
						"Step 6: Team does not exist in division, creating new team"
					);

					const unpaidTeamToPay = updatedUser.unpaidTeams.find((team) => {
						return (
							team.division._id.toString() === metadata.division.toString()
						);
					});

					console.log("Step 7: Found unpaidTeamToPay:", unpaidTeamToPay);

					const newTeam = new Team({
						teamName: unpaidTeamToPay.teamDetails.teamName,
						teamNameShort: unpaidTeamToPay.teamDetails.teamNameShort,
						teamCode: unpaidTeamToPay.teamDetails.teamCode,
						paid: metadata.paid === true ? true : false,
						wins: 0,
						losses: 0,
						pointDifference: 0,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
						division: selectedDivision._id.toString(),
						season: selectedDivision.season.toString(),
					});
					console.log("Step 8: Created newTeam object:", newTeam);

					// Save the new team to the database
					const savedTeam = await newTeam.save();
					console.log("Step 9: Saved new team to database:", savedTeam);

					selectedDivision.teams = selectedDivision.teams.concat(savedTeam._id);
					await selectedDivision.save();
					console.log(
						"Step 10: Added new team to selectedDivision and saved:",
						selectedDivision
					);

					// Register player
					let registeredPlayer;

					const newPlayerFields = {
						season: selectedDivision.season.toString(),
						division: selectedDivision._id.toString(),
						team: savedTeam._id,
						teamCaptain: true,
						playerName: unpaidTeamToPay.teamCaptainDetails.playerName,
						instagram: unpaidTeamToPay.teamCaptainDetails.instagram,
						jerseyNumber: unpaidTeamToPay.teamCaptainDetails.jerseyNumber,
						jerseySize: unpaidTeamToPay.teamCaptainDetails.jerseySize,
						jerseyName: unpaidTeamToPay.teamCaptainDetails.jerseyName,
						agreeToRefundPolicy: unpaidTeamToPay.checkboxes.agreeToRefundPolicy,
						agreeToTerms: unpaidTeamToPay.checkboxes.agreeToTerms,
						receiveNews: unpaidTeamToPay.checkboxes.receiveNews,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					};

					console.log("Step 11: Prepared newPlayerFields:", newPlayerFields);

					if (metadata.payment === "four") {
						registeredPlayer = new Player({
							...newPlayerFields,
							customerId: session.customer,
						});
					} else {
						registeredPlayer = new Player({
							...newPlayerFields,
						});
					}
					console.log(
						"Step 12: Created registeredPlayer object:",
						registeredPlayer
					);

					await registeredPlayer.save();
					console.log("Step 13: Saved registered player:", registeredPlayer);

					const updatedTeam = await Team.findById(savedTeam._id);
					console.log("Step 14: Fetched updated team:", updatedTeam);

					// Save the team and user information
					updatedTeam.players = updatedTeam.players.concat(
						registeredPlayer._id
					);
					updatedTeam.teamCaptain = registeredPlayer._id;
					updatedUser.basketball = updatedUser.basketball.concat(
						registeredPlayer._id
					);
					console.log(
						"Step 15: Updated team and user with registered player details:",
						updatedUser
					);

					// Create and save all players concurrently
					const playerPromises = unpaidTeamToPay.players.map(async (player) => {
						const newPlayer = new Player({
							season: selectedDivision.season.toString(),
							division: selectedDivision._id.toString(),
							team: savedTeam._id,
							teamCaptain: false,
							playerName: player.name,
							averageStats: {
								points: 0,
								rebounds: 0,
								assists: 0,
								blocks: 0,
								steals: 0,
								threesMade: 0,
								twosMade: 0,
								freeThrowsMade: 0,
							},
						});
						console.log("Step 16: Creating new player:", newPlayer);

						const savedPlayer = await newPlayer.save();
						console.log("Step 17: Saved new player to database:", savedPlayer);

						return savedPlayer._id;
					});

					// Wait for all players to be saved and update the team
					const playerIds = await Promise.all(playerPromises);
					updatedTeam.players = updatedTeam.players.concat(playerIds);

					await updatedTeam.save();
					console.log("Step 18: Updated team with all player IDs:", playerIds);

					await updatedUser.save();
					console.log("Step 19: Saved updated team and user to database");

					if (metadata.payment === "four") {
						let schedule = await stripe.subscriptionSchedules.create({
							from_subscription: session.subscription as string,
						});

						const phases = schedule.phases.map((phase) => ({
							start_date: phase.start_date,
							end_date: phase.end_date,
							items: phase.items,
						}));

						// const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
						// 	[
						// 		...phases.map((phase) => ({
						// 			...phase,
						// 			items: phase.items.map((item) => ({
						// 				price:
						// 					selectedDivision.earlyBirdOpen === true
						// 						? selectedDivision.earlyBirdInstalmentId
						// 						: selectedDivision.regularPriceInstalmentId,
						// 				quantity: 1,
						// 			})),
						// 		})),
						// 		{
						// 			items: [
						// 				{
						// 					price:
						// 						selectedDivision.earlyBirdOpen === true
						// 							? selectedDivision.earlyBirdInstalmentId
						// 							: selectedDivision.regularPriceInstalmentId,
						// 					quantity: 1,
						// 				} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
						// 			],
						// 			iterations: 3,
						// 		},
						// 	];
						const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
							[
								{
									items: [
										{
											price: selectedDivision.firstInstalmentPriceId, // Initial $25 payment
											quantity: 1,
										},
									],
									start_date: schedule.phases[0].start_date,
									end_date: schedule.phases[0].end_date,
								},
								{
									items: [
										{
											price: selectedDivision.regularPriceInstalmentId, // $85 installment price ID
											quantity: 1,
										},
									],
									start_date: schedule.phases[0].end_date,
									iterations: 3,
								},
							];

						schedule = await stripe.subscriptionSchedules.update(schedule.id, {
							end_behavior: "cancel",
							phases: updatedPhases,
						});
					}
				}
			}

			if (metadata.status === "joinTeam") {
				const updatedUser = await User.findOne({
					email: metadata.email,
				});
				console.log("updatedUser", updatedUser);

				const selectedDivision = await Division.findById(metadata.division);
				console.log("selectedDivision", selectedDivision);

				if (metadata.createdManually === true) {
					const selectedTeam = await Team.findById(metadata.team);
					console.log("selectedTeam", selectedTeam);

					const newPlayer = new Player({
						season: selectedTeam.season.toString(),
						division: selectedTeam.division.toString(),
						team: metadata.team.toString(),
						playerName: metadata.playerName,
						instagram: metadata.instagram,
						jerseyNumber: metadata.jerseyNumber,
						jerseySize: metadata.jerseySize,
						jerseyName: metadata.jerseyName,
						agreeToRefundPolicy: metadata.agreeToRefundPolicy,
						agreeToTerms: metadata.agreeToTerms,
						receiveNews: metadata.receiveNews,
						user: updatedUser._id,
						averageStats: {
							points: 0,
							rebounds: 0,
							assists: 0,
							blocks: 0,
							steals: 0,
							threesMade: 0,
							twosMade: 0,
							freeThrowsMade: 0,
						},
					});
					console.log("newPlayer", newPlayer);

					await newPlayer.save();
					console.log("Registered player:", newPlayer);
					selectedTeam.players = selectedTeam.players.concat(newPlayer._id);
					await selectedTeam.save();
					console.log("selectedTeam", selectedTeam);

					updatedUser.basketball = updatedUser.basketball.concat(newPlayer._id);

					await updatedUser.save();
					console.log("updatedUser", updatedUser);
				} else {
					const newPlayer = await Player.findById(metadata.playerId);
					console.log("updatedUser:", updatedUser);
					console.log("newPlayer:", newPlayer);
					newPlayer.playerName = metadata.playerName;
					newPlayer.instagram = metadata.instagram;
					newPlayer.jerseyNumber = metadata.jerseyNumber;
					newPlayer.jerseySize = metadata.jerseySize;
					newPlayer.jerseyName = metadata.jerseyName;
					newPlayer.agreeToRefundPolicy = metadata.agreeToRefundPolicy;
					newPlayer.agreeToTerms = metadata.agreeToTerms;
					newPlayer.receiveNews = metadata.receiveNews;
					newPlayer.user = updatedUser._id;

					if (metadata.payment === "four") {
						newPlayer.customerId = session.customer;
					}
					console.log("Registered player:", newPlayer);

					await newPlayer.save();
					console.log("Registered player:", newPlayer);
					// Handle the rest of the code based on the existingPlayer

					updatedUser.basketball = updatedUser.basketball.concat(newPlayer._id);

					await updatedUser.save();
				}

				if (metadata.payment === "four") {
					let schedule = await stripe.subscriptionSchedules.create({
						from_subscription: session.subscription as string,
					});

					const phases = schedule.phases.map((phase) => ({
						start_date: phase.start_date,
						end_date: phase.end_date,
						items: phase.items,
					}));

					// const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
					// 	[
					// 		...phases.map((phase) => ({
					// 			...phase,
					// 			items: phase.items.map((item) => ({
					// 				price:
					// 					selectedDivision.earlyBirdOpen === true
					// 						? selectedDivision.earlyBirdInstalmentId
					// 						: selectedDivision.regularPriceInstalmentId,
					// 				quantity: 1,
					// 			})),
					// 		})),
					// 		{
					// 			items: [
					// 				{
					// 					price:
					// 						selectedDivision.earlyBirdOpen === true
					// 							? selectedDivision.earlyBirdInstalmentId
					// 							: selectedDivision.regularPriceInstalmentId,
					// 					quantity: 1,
					// 				} as Stripe.SubscriptionScheduleUpdateParams.Phase.Item,
					// 			],
					// 			iterations: 3,
					// 		},
					// 	];

					const updatedPhases: Stripe.SubscriptionScheduleUpdateParams.Phase[] =
						[
							{
								items: [
									{
										price: selectedDivision.firstInstalmentPriceId, // Initial $25 payment
										quantity: 1,
									},
								],
								start_date: schedule.phases[0].start_date,
								end_date: schedule.phases[0].end_date,
							},
							{
								items: [
									{
										price: selectedDivision.regularPriceInstalmentId, // $85 installment price ID
										quantity: 1,
									},
								],
								start_date: schedule.phases[0].end_date,
								iterations: 3,
							},
						];

					schedule = await stripe.subscriptionSchedules.update(schedule.id, {
						end_behavior: "cancel",
						phases: updatedPhases,
					});
				}
			}

			const auth = new google.auth.GoogleAuth({
				credentials: {
					client_email: process.env.CLIENT_EMAIL,
					client_id: process.env.CLIENT_ID,
					private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Replace \\n with actual line breaks
				},
				scopes: [
					"https://www.googleapis.com/auth/drive",
					"https://www.googleapis.com/auth/drive.file",
					"https://www.googleapis.com/auth/spreadsheets",
				],
			});

			const sheets = google.sheets({
				auth,
				version: "v4",
			});

			const response = await sheets.spreadsheets.values.append({
				spreadsheetId: "1uFrrYeBPut9A0_6zvC90YJm22FRBXAuL_pG64bJmymU",
				range: "Sheet5!A2:I", // Assuming 5 columns are required for the form data
				valueInputOption: "USER_ENTERED",
				requestBody: {
					values: [
						[
							metadata.status,
							metadata.teamName,
							metadata.playerName,
							metadata.instagram,
							metadata.phoneNumber,
							metadata.email,
							metadata.divisionName,
							metadata.payment === "four" ? "Yes" : "No",
						],
					],
				},
			});
		}
	} else if (event.type === "invoice.payment_failed") {
		const session = event.data.object;

		if (session.billing_reason === "subscription_cycle") {
			// // Find the RegisterPlayer based on the customer's email
			// const registeredPlayer = await RegisterPlayer.findOne({
			// 	email: session.customer_email,
			// });
			// // Check if the customer with the same invoice ID exists
			// const existingCustomer = await Customer.findOne({
			// 	invoiceId: session.id,
			// });
			// if (existingCustomer) {
			// 	// Customer with the same invoice ID found, update attempt count
			// 	existingCustomer.attempt_count = session.attempt_count;
			// 	// Save the updated customer data to MongoDB
			// 	try {
			// 		await existingCustomer.save();
			// 		console.log("Customer data updated in MongoDB:", existingCustomer);
			// 	} catch (err) {
			// 		console.error("Error updating customer data:", err);
			// 	}
			// } else {
			// 	const periodEnd = new Date(session.period_end * 1000); // Convert timestamp to milliseconds
			// 	const periodStart = new Date(session.period_start * 1000); // Convert timestamp to milliseconds
			// 	// Create a new Customer document
			// 	const newCustomer = new Customer({
			// 		customerId: session.customer,
			// 		customerName: registeredPlayer
			// 			? registeredPlayer.registrationName
			// 			: session.customer_name,
			// 		customerEmail: session.customer_email,
			// 		invoiceId: session.id,
			// 		invoiceAmountDue: session.amount_due,
			// 		invoiceStatus: session.status,
			// 		paymentFailedTimestamp: new Date(),
			// 		instagram: registeredPlayer ? registeredPlayer.instagram : "",
			// 		phoneNumber: registeredPlayer ? registeredPlayer.phoneNumber : "",
			// 		division: registeredPlayer ? registeredPlayer.division : "",
			// 		hosted_invoice_url: session.hosted_invoice_url,
			// 		period_end: `${
			// 			periodEnd.getMonth() + 1
			// 		}/${periodEnd.getDate()}/${periodEnd.getFullYear()}`,
			// 		period_start: `${
			// 			periodStart.getMonth() + 1
			// 		}/${periodStart.getDate()}/${periodStart.getFullYear()}`,
			// 		attempt_count: session.attempt_count, // Add attempt_count field
			// 	});
			// 	// Save the customer data to MongoDB
			// 	try {
			// 		await newCustomer.save();
			// 		console.log("Customer data saved to MongoDB:", newCustomer);
			// 	} catch (err) {
			// 		console.error("Error saving customer data:", err);
			// 	}
			// }
		}
	} else if (event.type === "invoice.payment_succeeded") {
		// console.log("✅ invoice.payment_succeeded:", event.id);
		// const session = event.data.object;
		// console.log(`💰 Payment succeeded!`);
		// // Find and delete the customer by customerId
		// try {
		// 	const deletedCustomer = await Customer.findOneAndDelete({
		// 		customerId: session.customer,
		// 	});
		// 	if (deletedCustomer) {
		// 		console.log("Customer deleted from MongoDB:", deletedCustomer);
		// 	} else {
		// 		console.log("Customer not found in MongoDB.");
		// 	}
		// } catch (err) {
		// 	console.error("Error deleting customer data:", err);
		// }
	} else {
		console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
	}

	// 3. Return a response to acknowledge receipt of the event.
	return NextResponse.json({ received: true });
}
