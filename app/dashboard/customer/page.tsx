// /app/customer/dashboard/page.tsx


import { auth } from '@/auth';
import { redirect } from 'next/navigation';


export default async function CustomerDashboard() {
    const session = await auth();

    if (!session || session.user?.role !== 'CUSTOMER') {
        redirect('/auth/signin');
    }

    return (
        <div>
            <h1>Customer Dashboard</h1>
            <p>Welcome, {session.user.email}</p>
        </div>
    );
}
