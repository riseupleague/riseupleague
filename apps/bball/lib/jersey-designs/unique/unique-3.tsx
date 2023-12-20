import Image from "next/image";

export default function Unique3() {
	return (
		<div className="flex justify-center">
			<Image
				src={`/images/jersey/placeholders/unique/unique-3.png`}
				alt={`unique-3 jersey`}
				width={500}
				height={300}
			/>
		</div>
	);
}
