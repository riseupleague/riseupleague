import Image from "next/image";

export default function Unique2() {
	return (
		<div className="flex justify-center">
			<Image
				src={`/images/jersey/placeholders/unique/unique-2.png`}
				alt={`unique-2 jersey`}
				width={500}
				height={300}
			/>
		</div>
	);
}
