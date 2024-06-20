import NextAuth, { type DefaultSession } from "next-auth";
import { WorkerRole } from "@prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
	type: WorkerRole;
};

declare module "next-auth" {
	interface Session {
		user: ExtendedUser;
	}
}
