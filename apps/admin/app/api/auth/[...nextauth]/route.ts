import NextAuth from "next-auth";

import { authOptions } from "./options"; // Adjust the path as necessary

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
