"use client";

import { Button } from "@ui/components/button";
import { progressData } from "@/lib/data/register/progressData";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const RegisterProgress = ({ registerInfo }: { registerInfo: any }) => {
	return (
		<div className="mx-auto my-8 grid max-w-2xl grid-cols-5 bg-neutral-900">
			{progressData.map((data, index) => (
				<RegisterProgressButton
					key={index}
					step={data.step}
					registerInfo={registerInfo}
					text={data.text}
					link={data.link}
				/>
			))}
		</div>
	);
};

const RegisterProgressButton = ({ step, registerInfo, text, link }) => {
	// const router = useRouter();

	let activeColour = "border-primary";
	if (registerInfo.step < step) activeColour = "border-neutral-400";

	console.log(`registerInfo.allowStep[${step}]:`, registerInfo.allowStep[step]);

	if (!registerInfo.allowStep[step]) {
		return (
			<Button
				disabled={!registerInfo.allowStep[step]}
				className="flex flex-col items-center justify-start gap-3 bg-transparent p-0 text-white hover:bg-transparent hover:brightness-150"
			>
				<div className="flex w-full">
					<span
						className={`${step === 1 ? "border-transparent" : activeColour} w-full translate-y-4 border-t-2`}
					/>
					<span
						className={`${activeColour} ${registerInfo.step < step ? "text-neutral-400" : "text-white"} ${registerInfo.step > step ? "bg-primary" : "bg-transparent"} flex size-8 items-center justify-center rounded-full border-2 p-4`}
					>
						{step}
					</span>
					<span
						className={`${step === 5 ? "border-transparent" : activeColour} w-full translate-y-4 border-t-2`}
					/>
				</div>
				<p
					className={`${registerInfo.step < step ? "text-neutral-400" : "text-white"} font-barlow flex max-w-12 justify-center text-center text-base uppercase`}
				>
					{text}
				</p>
			</Button>
		);
	} else {
		return (
			<Link
				href={link}
				className="flex flex-col items-center justify-start gap-3 bg-transparent p-0 text-white hover:bg-transparent hover:brightness-150"
			>
				<div className="flex w-full">
					<span
						className={`${step === 1 ? "border-transparent" : activeColour} w-full translate-y-4 border-t-2`}
					/>
					<span
						className={`${activeColour} ${registerInfo.step < step ? "text-neutral-400" : "text-white"} ${registerInfo.step > step ? "bg-primary" : "bg-transparent"} flex size-8 items-center justify-center rounded-full border-2 p-4`}
					>
						{step}
					</span>
					<span
						className={`${step === 5 ? "border-transparent" : activeColour} w-full translate-y-4 border-t-2`}
					/>
				</div>
				<p
					className={`${registerInfo.step < step ? "text-neutral-400" : "text-white"} font-barlow flex max-w-12 justify-center text-center text-base uppercase`}
				>
					{text}
				</p>
			</Link>
		);
	}
};

export default RegisterProgress;
