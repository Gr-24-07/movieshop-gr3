// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token; // Access token from nextauth

        // Extract user role from the token
        const userRole = token?.role;

        // Redirect based on user role
        if (userRole === 'ADMIN') {

            return NextResponse.redirect(new URL('/admin/dashboard', req.url));

        } else if (userRole === 'CUSTOMER') {

            return NextResponse.redirect(new URL('/customer/dashboard', req.url));

        }

        return NextResponse.next();
    },

    {
        callbacks: {
            authorized: ({ token }) => !!token, // Check if a valid token exists
        },
    }
);

export const config = {
    matcher: ['/admin/dashboard /:path*', '/customer/dashboard/:path*'], 
};
