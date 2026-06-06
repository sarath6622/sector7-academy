import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Edge-safe middleware — runs the `authorized` callback to gate /admin.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/admin/:path*"],
};
