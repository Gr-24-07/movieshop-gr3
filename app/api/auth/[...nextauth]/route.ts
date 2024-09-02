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
           
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role;
            }
      
            return session;
        },
        async signIn({ user, account }) {

            if (account?.provider === 'google') {
                await prisma.user.upsert({
                    where: { email: user.email! },
                    update: { image: user.image},
                    create: {
                        email: user.email!,
                        image: user.image,
                        name: user.name || user.name,
                        role: Role.CUSTOMER
                    }
                })
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as CustomAdapterUser).role;
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