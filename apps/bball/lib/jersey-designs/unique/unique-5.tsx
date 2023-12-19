import Image from "next/image";

export default function Unique5() {
	return (
		<div className="flex justify-center">
			<Image
				src={`/images/jersey/placeholders/unique/unique-5.png`}
				alt={`unique-5 jersey`}
				width={500}
				height={300}
			/>
		</div>
	);
}
