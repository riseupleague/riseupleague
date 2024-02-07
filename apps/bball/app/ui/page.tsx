const UI = (): JSX.Element => {
	return (
		<section className="container mx-auto">
			<h1>UI Style Guide</h1>

			<hr />

			{/* headings */}

			<h1 className="text-primary">Headings</h1>
			<div className="flex flex-col gap-2 text-left">
				<h1 className="text-left">Heading H1</h1>
				<h2>Heading H2</h2>
				<h3>Heading H3</h3>
				<h4>Heading H4</h4>
				<h5>Heading H5</h5>
				<h6>Heading H6</h6>
			</div>

			<hr />

			{/* paragraphs */}
			<h1 className="text-primary">Paragraphs</h1>
			<div className="flex flex-col gap-4">
				<p className="font-barlow text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.{" "}
				</p>
				<p className="font-barlow text-base">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.{" "}
				</p>
				<p className="font-barlow text-2xl">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.{" "}
				</p>
			</div>

			<hr />

			{/* colours */}
			<h1 className="text-primary">Colours</h1>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
				<div className="bg-primary flex h-[150px] w-full items-center justify-center rounded border border-neutral-500">
					<span className="text-center text-lg font-medium uppercase text-neutral-50">
						primary <br />
						#ff422e
					</span>
				</div>
				<div className="bg-secondary flex h-[150px] w-full items-center justify-center rounded border border-neutral-500">
					<span className="text-primary text-center text-lg font-medium uppercase">
						secondary <br />
						#e8341c
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-50">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-50 <br />
						#fafbfc
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-100">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-100 <br />
						#fefefe
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-200">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-200 <br />
						#dfe2e6
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-300">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-300 <br />
						#abafb3
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-300">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-350 <br />
						#798394
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-400">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-400 <br />
						#82878d
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-500">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-500 <br />
						#555b64
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-600">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-600 <br />
						#282d35
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-700">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-700 <br />
						#11161d
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-800">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-800 <br />
						#11161f
					</span>
				</div>
				<div className="flex h-[150px] w-full items-center justify-center rounded border border-neutral-500 bg-neutral-900">
					<span className="text-primary text-center text-lg font-medium uppercase">
						neutral-900 <br />
						#04080f
					</span>
				</div>
			</div>
		</section>
	);
};

export default UI;
