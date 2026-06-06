import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config (no Prisma / bcrypt imports).
 * Shared by the middleware and the full Node-runtime config in auth.ts.
 */
export const authConfig = {
  trustHost: true,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  providers: [], // real provider added in auth.ts (Node runtime)
  callbacks: {
    /** Route protection — runs in middleware. */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === "/admin/login";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL("/admin", nextUrl));
        return true; // allow anyone to reach the login page
      }
      if (isOnAdmin) return isLoggedIn; // gate the rest of /admin
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? session.user.id;
        session.user.role = (token.role as string) ?? "STUDENT";
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
