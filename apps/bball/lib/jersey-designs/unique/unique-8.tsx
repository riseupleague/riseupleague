import Image from "next/image";

export default function Unique8() {
	return (
		<div className="flex justify-center">
			<Image
				src={`/images/jersey/placeholders/unique/unique-8.png`}
				alt={`unique-8 jersey`}
				width={500}
				height={300}
			/>
		</div>
	);
}
