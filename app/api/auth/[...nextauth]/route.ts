import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"




interface User {
    id?: string | null | undefined;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export const authOptions = ({ 
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),

    providers : [
        CredentialsProvider({
            name: 'Credentials',
           
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                });

                if(user && user.password && (await compare(credentials.password as string, user.password))) {
                    return {id: user.id, email: user.email}
                }

                throw new Error('Invalid credentials');
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
    ],
    session: {
        strategy: "jwt" as "jwt" | "database" | undefined
    },
    pages: {
        signIn: "api/auth/signin"
    },
    callbacks: {
      async session({ session, token }: { session: any; token: any }) {
        if (token) {
          session.user = session.user ?? {} as User;
          session.user.id = token.sub;
        }
        return session;
      },
      async jwt({ token, user }: { token: any; user: User }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
})

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }