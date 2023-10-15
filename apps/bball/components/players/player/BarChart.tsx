"use client";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
const BarChart = ({ stats, allAvg, label, avgLabel }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null); // Add type annotation for HTMLCanvasElement

	useEffect(() => {
		const myChartRef = chartRef.current.getContext("2d");
		let myChart = new Chart(myChartRef, {
			type: "bar",
			data: {
				labels: ["Points", "Rebounds", "Assists", "Steals", "Blocks"],
				datasets: [
					{
						label: `${label}`,
						data: [
							stats?.points,
							stats?.rebounds,
							stats?.assists,
							stats?.steals,
							stats?.blocks,
						],
						backgroundColor: "rgba(255, 99, 132, 0.2)",
						borderColor: "rgba(255, 99, 132, 1)",
						borderWidth: 1,
					},
					{
						label: `${avgLabel}`,
						data: [
							allAvg.points,
							allAvg.rebounds,
							allAvg.assists,
							allAvg.steals,
							allAvg.blocks,
						],
						backgroundColor: "rgba(54, 162, 235, 0.2)",
						borderColor: "rgba(54, 162, 235, 1)",
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						suggestedMin: 0,
					},
				},
			},
		});

		return () => {
			myChart.destroy();
		};
	}, [stats, allAvg, avgLabel, label]);

	return (
		<div style={{ flex: 1 }}>
			<canvas id="myChart" ref={chartRef} style={{ width: "100%" }} />
		</div>
	);
};

export default BarChart;
