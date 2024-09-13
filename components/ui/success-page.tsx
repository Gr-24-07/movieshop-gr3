
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Order, OrderItem } from "@prisma/client"
import prisma from "@/lib/prisma"


export async function SuccessPage() {
  const order = await prisma.order.findFirst()
  const orderItems = await prisma.orderItem.deleteMany({
    where: {
      orderId: order?.id

    }
  })
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <CircleCheckIcon className="mx-auto h-12 w-12 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Payment Successful!</h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <div className="mt-6">
          <Link
            href={"/"}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Return to Homepage
          </Link>
        </div>
      </div>
      <div className="mt-12 w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>Order ID #</div>
              <div className="font-medium">{order?.id}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Total</div>
              <div className="font-medium">{order?.totalAmount} kr</div>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground">Order Status: {order?.status}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CircleCheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http:s//www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
