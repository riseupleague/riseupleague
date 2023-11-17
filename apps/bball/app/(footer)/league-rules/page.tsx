export default function LeagueRules(): JSX.Element {
	return (
		<section className="container mx-auto">
			<h1>league rules</h1>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div>
					<h2>fiba game format</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>2/20 mins halves instead of 4/10 mins quarters.</li>
						<li>2 timeouts per half and timeout on possession.</li>
						<li>No shot clock.</li>
					</ul>
				</div>

				<div>
					<h2>jerseys</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							Every player is{" "}
							<span className="text-primary bold uppercase underline">
								required
							</span>{" "}
							to wear their team&apos;s{" "}
							<span className="text-primary bold uppercase underline">top</span>{" "}
							and{" "}
							<span className="text-primary bold uppercase underline">
								bottom
							</span>{" "}
							jerseys during their games.
						</li>
						<li>
							Non-compliance will result in the player paying a{" "}
							<span className="text-primary bold uppercase underline">
								fine
							</span>{" "}
							of{" "}
							<span className="text-primary bold uppercase underline">$20</span>{" "}
							to be eligible to play.
						</li>
					</ul>
				</div>

				<div>
					<h2>player fill-ins</h2>
					<ul className="font-barlow my-4 list-outside list-disc pl-4 text-lg">
						<li>
							Players not listed on the roster must pay{" "}
							<span className="text-primary bold uppercase underline">$50</span>{" "}
							for each game they play.
						</li>
						<li>
							The{" "}
							<span className="text-primary bold uppercase underline">
								maximum
							</span>{" "}
							number of fill-in games allowed for{" "}
							<span className="text-primary bold uppercase underline">
								one player
							</span>{" "}
							is{" "}
							<span className="text-primary bold uppercase underline">
								three
							</span>
							, at a cost of{" "}
							<span className="text-primary bold uppercase underline">
								$50 per game.
							</span>
						</li>
					</ul>
				</div>

				<div>
					<h2>default fee</h2>
					<ul className="my-4 text-lg">
						<li>
							If your team defaults, your team will have to{" "}
							<span className="text-primary bold uppercase underline">pay</span>{" "}
							a fee of{" "}
							<span className="text-primary bold uppercase underline">$80</span>
							.
						</li>
						<li>
							In the case that a team does not pay their default fee, their team
							will be{" "}
							<span className="text-primary bold uppercase underline">
								suspended
							</span>{" "}
							and{" "}
							<span className="text-primary bold uppercase underline">
								not have a game.
							</span>
						</li>
					</ul>
				</div>

				<div>
					<h2>player conduct</h2>
					<ul className="my-4 text-lg">
						<li>
							Rise Up{" "}
							<span className="text-primary bold uppercase underline">
								does not
							</span>{" "}
							tolerate any type of{" "}
							<span className="text-primary bold uppercase underline">
								violence
							</span>{" "}
							[Please do not start any intentionally provoking actions that can
							lead to an alterncation]. Failure to comply will result in an
							immediate suspension.
						</li>
						<li>
							A player can be charged a{" "}
							<span className="text-primary bold uppercase underline">
								fine
							</span>{" "}
							of up to{" "}
							<span className="text-primary bold uppercase underline">
								$250.
							</span>
						</li>
						<li>
							Players{" "}
							<span className="text-primary bold uppercase underline">
								must pay
							</span>{" "}
							the{" "}
							<span className="text-primary bold uppercase underline">
								fine
							</span>{" "}
							in order to{" "}
							<span className="text-primary bold uppercase underline">
								play
							</span>{" "}
							in their next games.
						</li>
						<li>
							Depending on the severity, players will be{" "}
							<span className="text-primary bold uppercase underline">
								kicked out
							</span>{" "}
							of the league with{" "}
							<span className="text-primary bold uppercase underline">
								no refund.
							</span>{" "}
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
