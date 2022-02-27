import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash } from "node:crypto";

import { prisma } from "../../../services/prisma";

export default NextAuth({
  pages: {
    signIn: "/account/login",
    error: "/account/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.groupId = user.type;
      }

      return token;
    },
    session: ({ token, session }) => {
      if (token) {
        session.id = token.id;
        session.groupId = token.groupId;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Account Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const account = await prisma.accounts.findFirst({
          where: {
            name: { equals: credentials.name },
          },
        });

        if (!account) {
          return null;
        }

        const hashedPassword = createHash("sha1").update(credentials.password).digest("hex");

        if (account.password !== hashedPassword) {
          return null;
        }

        return account;
      },
    }),
  ],
});
