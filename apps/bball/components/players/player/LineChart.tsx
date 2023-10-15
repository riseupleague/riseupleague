"use client";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const LineChart = ({ stats }) => {
	const [selectedCategory, setSelectedCategory] = useState("points");

	const chartRef = useRef<HTMLCanvasElement | null>(null); // Add type annotation for HTMLCanvasElement
	useEffect(() => {
		const myChartRef = chartRef.current.getContext("2d");
		let myChart = new Chart(myChartRef, {
			type: "line",
			data: {
				labels: stats?.map((stat, index) => `Game${index + 1}`),
				datasets: [
					{
						label: `${selectedCategory
							.charAt(0)
							.toUpperCase()}${selectedCategory.slice(1)}`,
						data: stats?.map((stat) => stat[selectedCategory]),
						fill: false,
						borderColor: "rgba(75,192,192,1)",
						lineTension: 0.1,
					},
				],
			},
			options: {
				scales: {
					xAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: "Games",
							},
						},
					],
					yAxes: [
						{
							scaleLabel: {
								display: true,
								labelString: selectedCategory,
							},
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		});

		return () => {
			myChart.destroy();
		};
	}, [stats, selectedCategory]);

	return (
		<div style={{ flex: 1 }} className="mt-16 lg:mt-0">
			<div className="">
				<select
					style={{ backgroundColor: "#0a0e14" }}
					className="rounded p-2  font-semibold text-white"
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option value="points" className="font-semibold">
						Points
					</option>
					<option value="rebounds" className="font-semibold">
						Rebounds
					</option>
					<option value="assists" className="font-semibold">
						Assists
					</option>
					<option value="blocks" className="font-semibold">
						Blocks
					</option>
					<option value="steals" className="font-semibold">
						Steals
					</option>
				</select>
			</div>
			<div>
				<canvas id="myChart" ref={chartRef} style={{ width: "100%" }} />
			</div>
		</div>
	);
};

export default LineChart;
