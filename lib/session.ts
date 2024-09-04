
import { getServerSession } from 'next-auth'; // Example for NextAuth
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function getUserSession() {
    try {
        const session = await getServerSession(authOptions);

        if (session && session.user) {
            return session.user;
        }
        return null; 
    } catch (error) {
        console.error('Error fetching user session:', error);
        return null; 
    }
}
