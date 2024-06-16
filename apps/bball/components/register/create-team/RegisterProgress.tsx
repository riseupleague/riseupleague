"use client";

import { Button } from "@ui/components/button";
import { progressData } from "@/lib/data/register/progressData";
// import { useRouter } from "next/navigation";

const RegisterProgress = ({
	registerInfo,
	setRegisterInfo,
}: {
	registerInfo: any;
	setRegisterInfo: any;
}) => {
	return (
		<div className="mx-auto my-8 grid max-w-2xl grid-cols-4 bg-neutral-900">
			{progressData.map((data, index) => (
				<RegisterProgressButton
					key={index}
					step={data.step}
					registerInfo={registerInfo}
					setRegisterInfo={setRegisterInfo}
					text={data.text}
				/>
			))}
		</div>
	);
};

const RegisterProgressButton = ({
	step,
	registerInfo,
	setRegisterInfo,
	text,
}) => {
	// const router = useRouter();

	let activeColour = "border-primary";
	if (registerInfo.step < step) activeColour = "border-neutral-400";
	const handleStep = () => {
		setRegisterInfo({
			...registerInfo,
			step,
		});

		// router.push("/register/create-team/?step=" + step);
	};

	console.log(`registerInfo.allowStep[${step}]:`, registerInfo.allowStep[step]);

	return (
		<Button
			onClick={handleStep}
			className="flex flex-col items-center justify-start gap-3 bg-transparent p-0 text-white hover:bg-transparent hover:brightness-150"
			disabled={!registerInfo.allowStep[step]}
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
					className={`${step === 4 ? "border-transparent" : activeColour} w-full translate-y-4 border-t-2`}
				/>
			</div>
			<p
				className={`${registerInfo.step < step ? "text-neutral-400" : "text-white"} font-barlow flex max-w-12 justify-center text-center text-base uppercase`}
			>
				{text}
			</p>
		</Button>
	);
};

export default RegisterProgress;
