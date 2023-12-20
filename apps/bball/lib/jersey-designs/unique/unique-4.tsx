import Image from "next/image";

export default function Unique4() {
	return (
		<div className="flex justify-center">
			<Image
				src={`/images/jersey/placeholders/unique/unique-4.png`}
				alt={`unique-4 jersey`}
				width={500}
				height={300}
			/>
		</div>
	);
}
