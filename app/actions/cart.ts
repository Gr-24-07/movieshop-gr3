'use server';

import { CART_COOKIE, CART_COOKIE_OPTIONS } from "@/constants";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Item = {
    name?: string;
    id: number;
    quantity: number;
    price: number;
    poster_path?: string;
};
export type Cart = Record<string, Item>;

// Helper function to get the current user's cart or initialize it
async function getOrCreateCart(userId: string) {
    const user = await getUserSession();
    if (!user) {
        throw new Error('User is not logged in');
    }
    let cart = await prisma.cart.findUnique({
        where: { userId: user.id },
    });

    if (!cart) {  
        cart = await prisma.cart.create({
            data: {
                userId: user.id,
            },
        });
    } 
    return cart;
   
}

// Get the current user's cart
export async function getCart() {
    const user = await getUserSession();
    if (user) {
        const cartItems = await prisma.cartItem.findMany({
            where: { cart: { userId: user.id } },
        });
        return cartItems.reduce((cart: Cart, item) => {
            cart[item.movieId] = {
                id: item.movieId,
                name: item.name || "Movie",
                quantity: item.quantity,
                price: item.price,
                
            };
            return cart;
        }, {});
    } else {
        return getCookie();
    }
}

// Add an item to the cart
export async function addToCart(item: Item) {
    const user = await getUserSession();
    if (user) {
        const cart = await getOrCreateCart(user.id);

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                movieId_cartId: {
                    movieId: item.id,
                    cartId: cart.id,
                },
            },
        });

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + item.quantity },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    movieId: item.id,
                    quantity: item.quantity,
                    price: item.price,

                },
            });
        }
    } else {
        const cart = getCookie();
        if (cart[item.id]) {
            cart[item.id].quantity += item.quantity;
        } else {
            cart[item.id] = {
                quantity: item.quantity,
                price: item.price,
                id: item.id,

            }
        }
        setCookie(cart);
    }
    revalidatePath("/");
}
// ####################### Update item in cart ############################
export async function updateCart(itemId: string, quantity: number) {
    const user = await getUserSession();
    if (user) {
        const cart = await getOrCreateCart(user.id);
        // Database operations for logged-in users
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                movieId_cartId: {
                    movieId: parseInt(itemId),
                    cartId: cart.id,
                },
            },
        });

        if (existingItem) {
            if (quantity > 0) {
                await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity },
                });
            } else {
                await prisma.cartItem.delete({
                    where: { id: existingItem.id },
                });
            }
        }
    } else {
        const cart = getCookie();
        if (cart[itemId]) {
            if (quantity > 0) {
                cart[itemId].quantity = quantity;
            } else {
                delete cart[itemId];
            }
            setCookie(cart);
        }
    }

    revalidatePath("/", "layout");
}

//####################### Remove an item from the cart #######################
export async function removeFromCart(itemId: string) {
    const user = await getUserSession();
    if (user) {
        const cart = await getOrCreateCart(user.id);
        await prisma.cartItem.deleteMany({
            where: {
                movieId: parseInt(itemId),
                cartId: cart.id,
            },
        });
    } else {
        const cart = getCookie();
        if (cart[itemId]) {
            delete cart[itemId];
            setCookie(cart);
        }
    }
    revalidatePath("/");
}

// Clear the entire cart
export async function clearCart() {
    const user = await getUserSession();
    if (user) {
        const cart = await getOrCreateCart(user.id);
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    } else {
        cookies().delete(CART_COOKIE);
    }
    revalidatePath("/");
}

// Get the cart from cookies
function getCookie(): Cart {
    const cookie = cookies().get(CART_COOKIE);
    try {
        return cookie ? JSON.parse(cookie.value) : {};
    } catch (error) {
        console.error("Error parsing cart cookie:", error);
        return {};
    }
}

// Set the cart in cookies
function setCookie(cart: Cart) {
    cookies().set(CART_COOKIE, JSON.stringify(cart), CART_COOKIE_OPTIONS);
}
