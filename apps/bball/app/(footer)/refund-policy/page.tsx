import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Rise Up League | Refund Policy",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default function RefundPolicy(): JSX.Element {
	return (
		<section className="container mx-auto">
			<h1>Refund Policy</h1>

			<div>
				<p className="my-4">
					Welcome to Rise Up Basketball League! We are excited to have you as
					part of our recreational basketball community. Before proceeding with
					your registration, we kindly request that you review and acknowledge
					our refund policy, as outlined below.
				</p>

				<p className="my-4">
					By clicking the &quot;I Agree&quot; button during the registration
					process, you acknowledge that you have read, understood, and agreed to
					the terms and conditions of this refund policy.
				</p>

				<h2 className="my-6">1. Registration Fee Refunds:</h2>

				<p className="my-4">
					1.1. <strong>Full Refund:</strong> A full refund of the registration
					fee will be provided if a participant requests a refund within 7 days
					of completing the registration process.
				</p>

				<p className="my-4">
					1.2. <strong>Partial Refund:</strong> A partial refund, minus an
					administrative fee, will be provided for refund requests made within
					14 days of completing the registration process. The administrative fee
					covers processing costs.
				</p>

				<p className="my-4">
					1.3. <strong>No Refund:</strong> No refund will be granted for refund
					requests made after 14 days of completing the registration process,
					except under exceptional circumstances such as medical emergencies or
					unexpected schedule conflicts. Such requests will be reviewed on a
					case-by-case basis.
				</p>

				<hr />

				<h2 className="my-6">2. Refund Request Procedure:</h2>

				<p className="my-4">
					2.1. All refund requests must be made in writing and sent to our
					league&apos;s official email address at{" "}
					<a
						href="mailto:riseupbballleague@gmail.com
"
					>
						riseupbballleague@gmail.com
					</a>
					. The subject line should read: &quot;Refund Request -
					[Participant&apos;s Name]&quot;.
				</p>

				<p className="my-4">
					2.2. The refund request email must include the following information:
				</p>
				<ul>
					<li>Participant&apos;s full name</li>
					<li>Registered team name and division</li>
					<li>Reason for the refund request</li>
					<li>Proof of payment (e.g., transaction ID, receipt)</li>
				</ul>

				<p className="my-4">
					2.3. Refund requests will be processed within 14 days of receipt of
					the complete refund request email.
				</p>

				<hr />

				<h2 className="my-6">3. League Cancellation:</h2>

				<p className="my-4">
					3.1. In the event that the Rise Up Basketball League is canceled
					before the start of the season for any reason, participants will be
					eligible for a full refund of their registration fee.
				</p>

				<p className="my-4">
					3.2. If the league is canceled after the start of the season due to
					unforeseen circumstances, a pro-rata refund may be issued based on the
					number of games remaining in the season.
				</p>

				<hr />

				<h2 className="my-6">4. Non-Refundable Items:</h2>

				<p className="my-4">
					4.1. Certain league-related items, such as uniforms, merchandise, or
					event tickets, may not be eligible for a refund unless explicitly
					stated otherwise.
				</p>

				<hr />

				<h2 className="my-6">5. Contact Information:</h2>

				<p className="my-4">
					For all refund-related inquiries or assistance, please contact our
					league&apos;s customer service at{" "}
					<a
						href="mailto:riseupbballleague@gmail.com"
						className="text-primary hover:underline"
					>
						riseupbballleague@gmail.com
					</a>{" "}
				</p>

				<p className="my-4">
					Please note that this refund policy is subject to change at the
					discretion of Rise Up Basketball League. Participants are encouraged
					to review the policy on our official website before completing their
					registration. Refund decisions will be made in accordance with this
					policy and our commitment to fairness and transparency.
				</p>

				<p className="my-4">Last Updated: August 8, 2023</p>

				<p className="my-4">
					By clicking the &quot;I Agree&quot; button during registration, you
					acknowledge that you have read, understood, and agreed to the terms
					and conditions of this refund policy.
				</p>
			</div>
		</section>
	);
}
