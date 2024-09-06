
import { Label } from "./label"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Card, CardHeader, CardTitle, CardContent } from "./card"
import { Separator } from "./separator"
import { Button } from "./button"
import React from "react"

export function CheckOut() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Shipping Address</Label>
                    <Textarea id="address" placeholder="Enter your shipping address" required />
                </div>
                <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="card" className="flex items-center gap-4">
                    <Label
                        htmlFor="card"
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-muted px-4 py-2 [&:has([data-state=checked])]:border-primary"
                    >
                        <RadioGroupItem id="card" value="card" />
                        <CreditCardIcon className="h-6 w-6" />
                        Credit Card
                    </Label>
                    <Label
                        htmlFor="paypal"
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-muted px-4 py-2 [&:has([data-state=checked])]:border-primary"
                    >
                        <RadioGroupItem id="paypal" value="paypal" />
                        <WalletIcon className="h-6 w-6" />
                        PayPal
                    </Label>
                    </RadioGroup>
                </div>
            </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>Acme Movie Bundle</span>
                            <span>$49.99</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between font-semibold">
                            <span>Total</span>
                            <span>$54.99</span>
                        </div>
                        </CardContent>
                    </Card>
                    <Button type="submit" className="w-full">
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    )
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}
