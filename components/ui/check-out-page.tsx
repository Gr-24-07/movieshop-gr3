
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function CheckOutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 py-8">
                <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="bg-background p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                <img
                                    src="/placeholder.svg"
                                    alt="Product Image"
                                    width={64}
                                    height={64}
                                    className="rounded-md"
                                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                                />
                                <div>
                                    <h3 className="font-medium">Acme Prism T-Shirt</h3>
                                    <p className="text-muted-foreground text-sm">Color: Black</p>
                                </div>
                                </div>
                                <div className="flex items-center gap-2">
                                <span className="font-medium">2</span>
                                <span className="text-muted-foreground">x</span>
                                <span className="font-medium">$49.99</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                <img
                                    src="/placeholder.svg"
                                    alt="Product Image"
                                    width={64}
                                    height={64}
                                    className="rounded-md"
                                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                                />
                                <div>
                                    <h3 className="font-medium">Acme Prism Hoodie</h3>
                                    <p className="text-muted-foreground text-sm">Color: Navy</p>
                                </div>
                                </div>
                                <div className="flex items-center gap-2">
                                <span className="font-medium">1</span>
                                <span className="text-muted-foreground">x</span>
                                <span className="font-medium">$79.99</span>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-medium">$179.97</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Shipping</span>
                                <span className="font-medium">$9.99</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">Tax</span>
                                <span className="font-medium">$14.40</span>
                            </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold">$204.36</span>
                        </div>
                    </div>
                    <div className="bg-background p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Billing Information</h2>
                        <form className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="John Doe" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="john@example.com" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St, Anytown USA" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="Anytown" />
                                </div>
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" placeholder="CA" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="zip">Zip Code</Label>
                                    <Input id="zip" placeholder="12345" />
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" placeholder="United States" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="payment">Payment Method</Label>
                                <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="credit-card">Credit Card</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="apple-pay">Apple Pay</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">
                                Place Order
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
