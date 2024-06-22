import RegisterForm from "@/components/auth/RegisterForm";
import { isRouteForOwnerOnly } from "@/utils/isRouteForOwnerOnly";
import React from "react";

const RegisterPage = async () => {
	await isRouteForOwnerOnly();
	return <RegisterForm />;
};

export default RegisterPage;
