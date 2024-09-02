// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { CART_COOKIE } from './constants';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token; // Access token from nextauth
        const cart = req.cookies.get(CART_COOKIE);
        const response = NextResponse.next();

        // Check if cart cookie exists
        if (!cart) {
            // Create cart cookie
             
        }
        // Check if the user is authenticated
        if (!token) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }

        // Extract user role from the token
        const userRole = token?.role;

        // Redirect based on user role
        if (userRole === 'ADMIN') {

            return NextResponse.redirect(new URL('/admin/dashboard', req.url));

        } else {    
            // Redirect to signin if user is not authenticated
            if (!token) {
                return NextResponse.redirect(new URL('/signin', req.url));
            }
        }
        
        if (userRole === 'CUSTOMER') {

            return NextResponse.redirect(new URL('/customer/dashboard', req.url));
          
        } else {    
            // Redirect to signin if user is not authenticated
            if (!token) {
                return NextResponse.redirect(new URL('/signin', req.url));
            }
        }

        return response;
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
