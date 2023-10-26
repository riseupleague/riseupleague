"use client";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const CompareBarCharts = ({ one, two, oneName, twoName }) => {
	const chartRef = useRef<HTMLCanvasElement | null>(null); // Add type annotation for HTMLCanvasElement

	useEffect(() => {
		const myChartRef = chartRef.current.getContext("2d");
		let myChart = new Chart(myChartRef, {
			type: "bar",
			data: {
				labels: ["Points", "Rebounds", "Assists", "Steals", "Blocks"],
				datasets: [
					{
						label: oneName,
						data: [
							one.averageStats?.points,
							one.averageStats?.rebounds,
							one.averageStats?.assists,
							one.averageStats?.steals,
							one.averageStats?.blocks,
						],
						backgroundColor: "rgba(255, 99, 132, 0.2)",
						borderColor: "rgba(255, 99, 132, 1)",
						borderWidth: 1,
					},
					{
						label: twoName,
						data: [
							two.averageStats?.points,
							two.averageStats?.rebounds,
							two.averageStats?.assists,
							two.averageStats?.steals,
							two.averageStats?.blocks,
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
	}, [one, two]);

	return (
		<div>
			<canvas id="myChart" ref={chartRef} style={{ width: "100%" }} />
		</div>
	);
};

export default CompareBarCharts;
