import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma'; // Your Prisma client setup
import { compare } from 'bcrypt';
import { Role } from '@prisma/client';
import { AdapterUser } from 'next-auth/adapters';

interface CustomAdapterUser extends AdapterUser {
    role: Role
}
  
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET! 
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: {  label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };

                const user = await prisma.user.findUnique ({
                    where: {
                        email: email
                    }
                });

            

                if( user && user.password && (await compare(password, user.password ))) {
                   
                    return {id: user.id, name: user.name, email: user.email, role: user.role}
                    
                }

                throw new Error('Invalid credentials, please try again');
            },
        })
    ],
    callbacks: {
        async session({ session, token }) {
           
            if (token && session.user) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: token.id
                    }
                })
                if (user) {
                    session.user.id = user.id
                    session.user.role = user.role
                }
            }
      
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        
    },
    pages: {
        signIn: '/signin',
        signOut: '/',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}
    
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }