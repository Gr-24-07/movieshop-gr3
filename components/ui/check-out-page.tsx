
'use client'
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useContext, useState } from "react"
import { CartContext } from "@/context/cartContext"
import Image from "next/image"
import Checkout  from "@/app/cart/checkout/checkout"

export function CheckOutPage() {
    const [userInfo, setUserInfo] = useState({ fullName: '', email: '', address: '', phoneNumber: '',  city: '', zipCode: '', country: '' });
    const [loading, setLoading] = useState(false);

    const cart = useContext(CartContext);
    if (!cart) {
       throw new Error('Cart context not found');
    }
    
    const cartItems = cart.items;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckout = async () => {
        try {
            setLoading(true);
            await Checkout(null, userInfo);
        } catch (error: any) {
            console.log('Error processing checkout: ' + error.message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <main className="flex-col min-h-screen flex-1 py-8">
            <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="bg-background p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {
                            cartItems.map((item: any) => (
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        alt="movie image" width={64} height={64} className="rounded-md"
                                    />
                                    <div>
                                        <h3 className="font-medium">{item.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{item.quantity}</span>
                                        <span className="text-muted-foreground">x</span>
                                        <span className="font-medium">{item.price} kr</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Subtotal</span>
                            <span className="font-medium">$179.97</span>
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
                                <Label htmlFor="fullName">FullName</Label>
                                <Input id="name" name="fullName" placeholder="John Doe" value={userInfo.fullName} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="john@example.com" value={userInfo.email} onChange={handleInputChange} required  />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" name="address" placeholder="123 Main St, Anytown USA" value={userInfo.address} onChange={handleInputChange} required  />
                        </div>
                        <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" placeholder="Anytown" value={userInfo.city} onChange={handleInputChange} required  />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="zip">Zip Code</Label>
                                <Input id="zip" name="zipCode" placeholder="12345" value={userInfo.zipCode}  onChange={handleInputChange} required />
                            </div>
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" name="country" placeholder="United States" value={userInfo.country}  onChange={handleInputChange} required />
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
                        <Button type="submit" className="w-full" onClick={handleCheckout} disabled={loading}>
                            { loading ? 'Processing...' : ' Place Order' }
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    )
}