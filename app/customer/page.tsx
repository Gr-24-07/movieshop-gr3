// /app/customer/dashboard/page.tsx


import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';


export default async function CustomerDashboard() {
     const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'CUSTOMER') {
        redirect('/auth/signin');
        return null;
    }

    return (
        <div>
            <h1>Customer Dashboard</h1>
            <p>Welcome, {session.user.email}</p>
        </div>
    );
}
