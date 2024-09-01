import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { DashboardTable } from '@/components/ui/dashboard-table';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions);

    // Redirect to sign-in if the user is not logged in
    if (!session || session.user.role !== 'ADMIN') {
        redirect('/auth/signin');
        return null;
    }

    return (
        <main className='admin-dashboard space-x-5'>
            <DashboardTable>{children}</DashboardTable> 
        </main>
        
  );
}
