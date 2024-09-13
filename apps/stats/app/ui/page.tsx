import { Separator } from "@ui/components/separator";
import { Button, btnVariants, ButtonProps } from "@ui/components/button";

const ui = () => {
	return (
		<div className="container mx-auto min-h-fit">
			<h1>ui page</h1>

			<Separator className="my-4 border-b border-neutral-500" />

			<div>
				{/* side bar */}
				<div></div>

				{/* main content */}
				<div>
					{/* button */}
					<div>
						<h2 className="mb-3">buttons</h2>
						<div className="grid grid-cols-4 gap-2">
							{Object.keys(btnVariants.variant).map((variant: any, index) => (
								<Button key={index} variant={variant} className="capitalize">
									{variant}
								</Button>
							))}
						</div>

						<h3 className="mb-3">sizes</h3>
						<div className="flex gap-2">
							{Object.keys(btnVariants.size).map((size: any, index) => (
								<Button key={index} size={size} className="capitalize">
									{size}
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>

			<Separator className="my-4 border-b border-neutral-500" />
		</div>
	);
};

export default ui;
