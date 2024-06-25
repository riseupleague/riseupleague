"use client";

import { useCurrentWorker } from "@/hooks/use-current-worker";
import React from "react";

const ErrorPage = () => {
	const worker = useCurrentWorker();

	return <h1>This page cannot be accessed.</h1>;
};

export default ErrorPage;
