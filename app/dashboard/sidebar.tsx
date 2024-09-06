
import Link from "next/link";
import { LayoutGrid, UsersRound, Film, SquareChartGantt, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="hidden w-64 flex-col border-r-2 bg-background p-4 sm:flex">
            <div className="flex items-center gap-2 border-b pb-4">
                <LayoutGrid className="h-6 w-6" />
                <Link
                    href="/dashboard/admin"
                    className="text-lg font-semibold"
                    prefetch={false}
                >
                    <span>Dashboard</span>
                </Link>
            </div>
            <nav className="mt-6 flex flex-col gap-2">
                <Link
                    href="/dashboard/orders"
                    className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-foreground transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                >
                    <SquareChartGantt className="h-5 w-5" />
                    <span>Orders</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                >
                    <UsersRound className="h-5 w-5" />
                    <span>Customers</span>
                </Link>
                <Link
                    href="/dashboard/movies"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                >
                    <Film className="h-5 w-5" />
                    <span>Movies</span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;