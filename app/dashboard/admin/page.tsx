import { auth } from '@/auth';
import AdminDashboard from '@/components/ui/admin-dashboard';
import { redirect } from 'next/navigation';


export default async function Dashboard() {
    const session = await auth();

    if (!session || session.user.role !== 'ADMIN') {
        redirect('/auth/signin');
    }

    return (

        <>
            <AdminDashboard />
        </>
    );
}
