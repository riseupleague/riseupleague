import * as React from "react";

interface JoinTeamReminderTemplateProps {
	teamName: string;
	teamCaptainName: string;
	playerName: string;
	reminderCount: number; // Added reminderCount
	teamId: string;
}

export const JoinTeamReminderTemplate: React.FC<
	JoinTeamReminderTemplateProps
> = ({ teamName, teamCaptainName, playerName, reminderCount, teamId }) => {
	return (
		<div style={styles.emailContainer}>
			<div>
				<img
					style={{ margin: "0 auto", width: "200px" }}
					src={`https://www.riseupleague.com/images/riseup-logo.png`}
					alt="Rise Up League Logo"
				/>
			</div>
			<div style={styles.header}>
				<h1>Hi {playerName},</h1>
				<p>Your team captain {teamCaptainName} is waiting for you!</p>
			</div>

			<div style={styles.body}>
				<p>
					You’ve been invited to join the <strong>{teamName}</strong> team,
					captained by <strong>{teamCaptainName}</strong>. We&apos;re excited to
					have you onboard and can&apos;t wait to see you on the court!
				</p>
				<p>
					Click the button below to complete your registration and join the
					team.
				</p>

				<a
					href={`https://www.riseupleague.com/register/join-team/${teamId}`}
					style={styles.button}
				>
					Join Now
				</a>

				<p style={styles.reminder}>
					This is reminder #{reminderCount} to join the team.
				</p>

				<p style={styles.note}>
					If you no longer wish to receive upcoming reminders, please ask your
					team captain, <strong>{teamCaptainName}</strong>, to remove you from
					the team.
				</p>
			</div>

			<div style={styles.footer}>
				<p>Thanks for being part of the league,</p>
				<p>The Rise Up League Team</p>
			</div>
		</div>
	);
};

// Styles for inline email design
const styles = {
	emailContainer: {
		fontFamily: "'Arial', sans-serif",
		padding: "20px",
		maxWidth: "600px",
		margin: "0 auto",
		backgroundColor: "#f9f9f9",
		borderRadius: "10px",
	},
	header: {
		textAlign: "center" as "center",
		color: "#333",
	},
	body: {
		padding: "20px",
		backgroundColor: "#fff",
		borderRadius: "10px",
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
		marginBottom: "20px",
	},
	button: {
		display: "inline-block",
		padding: "10px 20px",
		backgroundColor: "#007bff",
		color: "#fff",
		textDecoration: "none",
		borderRadius: "5px",
		fontWeight: "bold" as "bold",
		marginTop: "20px",
	},
	reminder: {
		marginTop: "20px",
		fontStyle: "italic",
		color: "#555",
	},
	note: {
		marginTop: "10px",
		color: "#666",
	},
	footer: {
		textAlign: "center" as "center",
		marginTop: "20px",
		color: "#666",
	},
};
