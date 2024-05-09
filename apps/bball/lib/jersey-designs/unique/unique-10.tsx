import Image from "next/image";

export default function Unique10() {
	return (
		<div className="flex justify-center">
			<Image
				src={`/images/jersey/placeholders/unique/unique-10.png`}
				alt={`unique-10 jersey`}
				width={500}
				height={300}
			/>
		</div>
	);
}
