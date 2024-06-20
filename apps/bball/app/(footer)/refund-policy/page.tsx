import { Metadata } from "next";

const RefundPolicy = (): JSX.Element => {
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

				<h2 className="my-6">Registration Fee Allocation:</h2>

				<p className="my-4">
					1. <strong>Funds Allocation:</strong> Upon immediate payment, $50 will
					be allocated towards the jersey order, and another $50 will be
					designated for gym fees. Please note that there will be no refunds for
					this transaction.
				</p>

				<h2 className="my-6">Registration Fee Refunds:</h2>

				<p className="my-4">
					1. <strong>Full Refund:</strong> A full refund of the registration fee
					will be granted if a player withdraws at least 30 days before the
					start of the season. To request a full refund, please contact us at
					riseupbballleague@gmailcom with your registration details.
				</p>

				<p className="my-4">
					2. <strong>Partial Refund:</strong> A 50% refund of the registration
					fee will be provided if a player withdraws between 15 and 29 days
					before the season starts.
				</p>

				<p className="my-4">
					3. <strong>No Refund:</strong>
				</p>
				<p className="underline">
					RiseUp League does not issue refunds in the following situations:
				</p>
				<ul>
					<li className="my-4 list-disc text-lg">
						The season has already started at the time the refund request is
						made.
					</li>
					<li className="my-4 list-disc text-lg">
						Player injuries, changes in physical condition, or other personal
						circumstances.
					</li>
					<li className="my-4 list-disc text-lg">
						Teams or individuals are suspended or ejected from the league for
						violating the Player Code of Conduct (e.g., fighting, threats,
						disruptive behavior, etc.).
					</li>
					<li className="my-4 list-disc text-lg">
						Cancellations due to inclement weather, forfeited games, or
						rescheduled games.
					</li>
					<li className="my-4 list-disc text-lg">
						Events beyond our control, including COVID-19 or other disasters.
					</li>
				</ul>

				<hr />

				<h2 className="my-6">Refund Process:</h2>

				<p className="my-4">
					1. All refund requests must be made in writing and sent to our
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
					2. The refund request email must include the following information:
				</p>
				<ul>
					<li>Participant&apos;s full name</li>
					<li>Registered team name and division</li>
					<li>Reason for the refund request</li>
					<li>Proof of payment (e.g., transaction ID, receipt)</li>
				</ul>

				<p className="my-4">
					3. Refund requests will be processed within 14 days of receipt of the
					complete refund request email.
				</p>

				<p className="my-4">
					4. Refunds will be issued via the original method of payment used
					during registration.
				</p>

				<hr />

				<h2 className="my-6">Special Considerations:</h2>

				<p className="my-4">
					Refunds will not be provided for missed games due to personal reasons,
					including vacations or conflicts with other activities.
				</p>

				<p className="my-4">
					No refunds will be issued for merchandise or uniforms once they have
					been ordered or distributed.
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

				<p className="my-4">Last Updated: June 17, 2024</p>

				<p className="my-4">
					By clicking the &quot;I Agree&quot; button during registration, you
					acknowledge that you have read, understood, and agreed to the terms
					and conditions of this refund policy.
				</p>
			</div>
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | Refund Policy",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default RefundPolicy;
