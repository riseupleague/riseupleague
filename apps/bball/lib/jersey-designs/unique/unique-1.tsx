import Image from "next/image";

export default function Unique1() {
	return (
		<div className="flex justify-center">
			<Image
				src={`/images/jersey/placeholders/unique/unique-1.png`}
				alt={`unique-1 jersey`}
				width={500}
				height={300}
			/>
		</div>
	);
}
