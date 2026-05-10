import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const sql = neon(process.env.DATABASE_URL!);

        try {
          const email = credentials.email as string;
          const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
          const user = rows[0] as any;

          if (user && (await bcrypt.compare(credentials.password as string, user.password))) {
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              image: user.image,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
