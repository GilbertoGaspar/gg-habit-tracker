import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Account, User, Session } from "next-auth";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user && user?.password && credentials?.password) {
          const isCorrectPassword = await compare(
            credentials.password,
            user.password
          );

          if (isCorrectPassword && user) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider === "google" && user?.email && user?.name) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user?.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              provider: account?.provider,
            },
          });
        }
      }

      return true;
    },
    async session({ session }: { session: Session }) {
      const userData = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (userData) {
        session.user.id = userData.id;
      }

      return session;
    },
  },
};
