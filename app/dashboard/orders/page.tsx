import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
} from "@/components/ui/table";
import prisma from '@/lib/prisma';
import Sidebar from '@/app/dashboard/sidebar';


export default async function OrdersDBPage() {
    const orders = await prisma.order.findMany({
        include: {
            orderItems: true
        }
    }

    )

    return (
        <div className="flex min-h-screen w-full container mx-auto my-10">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <header className="bg-background border-b-2 px-4 py-3 sm:px-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        Orders
                    </h1>
                </header>
                <main className="flex-1 p-4 sm:p-6">
                    <Table>
                        <TableCaption className="font-bold ">
                            A list of all orders.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {" "}
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.userId}</TableCell>
                                    <TableCell>{order.orderDate.toString()}</TableCell>
                                    <TableCell className="text-right">{order.totalAmount}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </main>
            </div>
        </div>
    )
}