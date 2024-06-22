"use client";
import { useCurrentWorker } from "@/hooks/use-current-worker";
import React from "react";

const ErrorPage = () => {
	const worker = useCurrentWorker();

	console.log("worker", worker);
	return <h1>This page cannot be accessed.</h1>;
};

export default ErrorPage;
