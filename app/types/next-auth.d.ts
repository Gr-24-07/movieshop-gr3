// /types/next-auth.d.ts
import NextAuth from 'next-auth';
import 'next-auth/jwt';

// Extend the session and token
declare module 'next-auth' {
    interface Session {
        user: {
            cartId: string;
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: 'CUSTOMER' | 'ADMIN'; 
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: 'CUSTOMER' | 'ADMIN'; 
    }
}
