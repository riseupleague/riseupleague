/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

import { DefaultSession, DefaultUser } from "next-auth";

import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			type: string;
		} & DefaultSession;
	}
	interface User extends DefaultUser {
		type: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		type: string;
	}
}
