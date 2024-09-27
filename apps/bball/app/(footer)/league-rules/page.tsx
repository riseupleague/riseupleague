import { Metadata } from "next";

const LeagueRules = (): JSX.Element => {
	return (
		<section className="container mx-auto">
			<h1>league rules</h1>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div>
					<h2>game format</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>Follows FIBA Rules.</li>
						<li>
							Two (2) 20-minute halves, stop time under the last 2:00 minutes of
							the second half if the point differential is 15+ points.
						</li>
						<li>Two (2) timeouts per half, live ball timeouts.</li>
						<li>Eight (8) team fouls in a half result in bonus free throws.</li>
						<li>
							Two (2) team fouls under 2:00 minutes in the second half result in
							bonus free throws.
						</li>
						<li>No shot clock (Except for Elite Division).</li>
						<li>
							In the Filipino Division, only 3 non-Filipino players are allowed
							(Except for Free Agents being put into teams).
						</li>
					</ul>
				</div>

				<div>
					<h2>overtime rules</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							If the game is tied after the two (2) 20-minute halves, it will go
							into a two (2) minute overtime period with stop-time and one (1)
							timeout per team.
						</li>
						<li>
							If still tied after overtime, an additional overtime period will
							be played where the first team to score wins.
						</li>
					</ul>
				</div>

				<div>
					<h2>player playoff eligibility</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							NO FILL-INS ALLOWED IN PLAYOFFS. Refer to the &apos;Player Fill-In
							policy.&apos;
						</li>
						<li>
							Players must have played a minimum of two (2) regular season games
							to be eligible for playoffs.
						</li>
						<li>Failure to comply may result in a forfeit and LOSS.</li>
					</ul>
				</div>

				<div>
					<h2>uniforms</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							Players MUST wear BOTH top & bottom of the team uniform with no
							exceptions.
						</li>
						<li>
							Players without BOTH top & bottom will not be eligible to play.
						</li>
						<li>
							Non-compliance will result in a $25 fine before being eligible to
							play.
						</li>
					</ul>
				</div>

				<div>
					<h2>player fill-ins</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							Players not listed on the roster will NOT be eligible unless
							APPROVED by the commissioner TWO (2) DAYS before the game.
						</li>
						<li>
							Fill-ins are allowed only under injury/medical circumstances, and
							the replacement must play two (2) regular-season games to be
							playoff-eligible.
						</li>
						<li>
							Previous games by the replaced player do NOT count towards the
							replacement&apos;s eligibility.
						</li>
					</ul>
				</div>

				<div>
					<h2>default rules and fee</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>Teams must have FIVE (5) players minimum to begin the game.</li>
						<li>
							If a team does not have FIVE (5) players by game time, the clock
							will start, and the opposing team is awarded 2 points per minute
							until FIVE (5) players are ready.
						</li>
						<li>
							The game will be FORFEITED if 10 minutes pass in the first half
							without FIVE (5) players.
						</li>
						<li>
							Teams with less than FIVE (5) players will default the game and be
							fined $80.
						</li>
						<li>
							Failure to pay the default fee will prevent the team from playing
							future games until the fee is paid in full.
						</li>
					</ul>
				</div>

				<div>
					<h2>player conduct</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							Rise Up DOES NOT TOLERATE violence or intentionally provoking
							actions that lead to altercations. Non-compliance results in
							immediate suspension.
						</li>
						<li>Violators can be fined up to $250.</li>
						<li>Fines MUST be paid before reinstatement.</li>
						<li>
							Severe incidents may result in being kicked out of the league with
							NO refund.
						</li>
					</ul>
				</div>

				<div>
					<h2>schedule</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>Teams must be available for all four (4) time slots.</li>
					</ul>
				</div>

				<div>
					<h2>installment payment</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>Players with missed payments will NOT be eligible to play.</li>
						<li>
							After week four (4), players with unpaid balances will not be
							allowed to play.
						</li>
					</ul>
				</div>

				<div>
					<h2>broadcast & media policy</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							YouTube videos cannot be used to overturn stats or game results;
							they are for media entertainment purposes only.
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export const metadata: Metadata = {
	title: "Rise Up League | League Rules",
	description:
		"The Rise Up League is a growing sports league that is taking Ontario by storm! Come join and Rise Up to the challenge!",
};

export default LeagueRules;
