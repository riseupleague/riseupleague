"use client";
import { useEffect, useRef } from "react";

const PointsCircle = ({ player, pointsAverage }) => {
	const canvasRef = useRef(null);

	const data = [
		{
			label: "Threes Made",
			points: player.averageStats?.threesMade,
			color: "#FAFAFA",
			value: 3, // point value for this category is 3
		},
		{
			label: "Twos Made",
			points: player.averageStats?.twosMade,
			color: "#E16B3D",
			value: 2, // point value for this category is 2
		},
		{
			label: "Free Throws Made",
			points: player.averageStats?.freeThrowsMade,
			color: "#6366F1",
			value: 1, // point value for this category is 1
		},
	];

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		// Calculate total points
		const totalPoints = data.reduce((acc, curr) => acc + curr.points, 0);

		// Calculate start and end angles for each slice
		let startAngle = 0;
		let endAngle = 0;
		data.forEach((item) => {
			endAngle = startAngle + (item.points / totalPoints) * 2 * Math.PI;
			context.beginPath();
			context.arc(
				canvas.width / 2,
				canvas.height / 2,
				canvas.width / 4, // make the radius 25% of canvas width
				startAngle,
				endAngle,
				false
			);
			context.lineWidth = canvas.width / 16; // make the line width 6.25% of canvas width
			context.strokeStyle = item.color;
			context.stroke();
			startAngle = endAngle;
		});

		// Add total points text
		const text = `${pointsAverage ? pointsAverage : "0"}` + " ppg";
		context.fillStyle = "#ffffff";
		context.textAlign = "center";
		context.textBaseline = "middle";

		// Start with the maximum font size
		let fontSize = Math.floor(canvas.width / 10); // calculate font size based on canvas width
		context.font = `${fontSize}px sans-serif`;

		// Reduce font size until the text fits
		while (context.measureText(text).width > canvas.width * 0.8) {
			fontSize -= 1;
			context.font = `${fontSize}px sans-serif`;
		}

		context.fillText(text, canvas.width / 2, canvas.height / 2);

		// Make the circle black if total points is zero
		if (totalPoints === 0) {
			context.beginPath();
			context.arc(
				canvas.width / 2,
				canvas.height / 2,
				canvas.width / 4,
				0,
				2 * Math.PI,
				false
			);
			context.lineWidth = canvas.width / 16;
			context.strokeStyle = "#0a0e14";
			context.stroke();
		}
	}, []);

	return (
		<canvas
			ref={canvasRef}
			width={220} // use relative width
			height={"auto"} // use auto height to maintain aspect ratio
			style={{ maxWidth: "220px", borderRadius: "50%" }} // set max width and border radius
		></canvas>
	);
};

export default PointsCircle;
