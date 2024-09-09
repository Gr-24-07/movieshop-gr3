"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Cart() {
  const { cart, clearCart, removeItem, updateQuantity } = useCart();

  return (
    <>
        {Object.values(cart).length === 0 ? (
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
                    <p className="text-lg">Your shopping cart is empty.</p>
                </div>
            </div>
        ) : (
            <div className="container mx-auto px-4 md:px-6 py-12">
                <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
                <div className="grid md:grid-cols-[1fr_300px] gap-8">
                    <div className="grid gap-6">
                        {Object.values(cart).map((item) => (
                            <div key={item.id} className="grid grid-cols-[100px_1fr_auto] items-center gap-4">
                            <Image
                                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={"title"} width={500}height={500}
                                className="rounded-lg object-cover h-34 w-34"
                            />
                            <div className="grid gap-1">
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm" variant="outline" onClick={() =>
                                            updateQuantity(
                                                item.id.toString(),
                                                Math.max(item.quantity - 1, 1)
                                            )
                                        }
                                    >
                                        -
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button size="sm" variant="outline" onClick={() =>
                                            updateQuantity(item.id.toString(), item.quantity + 1)
                                        }
                                    >
                                        +
                                    </Button>
                                    <h3 className="font-semibold">{item.name}</h3>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="font-semibold">
                                    {item.quantity * item.price} kr
                                </span>
                                <Button size="sm" variant="ghost" className="ml-4"
                                    onClick={() => removeItem(item.id.toString())}
                                >
                                Remove
                                </Button>
                            </div>
                            </div>
                        ))}
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>1000</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>1000</span>
                            </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href="/cart/checkout"><Button  className="w-full">Proceed to Checkout</Button></Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )}
    </>
  );
}
