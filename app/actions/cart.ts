'use server';
import { CART_COOKIE, CART_COOKIE_OPTIONS } from "@/constants";
import prisma from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type Item = {
    id: number;
    name?: string;
    quantity: number;
    price: number;
    poster_path?: string;
};
export type Cart = Record<string, Item>;

// ####################### Get cart ############################
export async function getCart() {
    const user = await getUserSession();
    if (user) {
        const cartItems = await prisma.cartItem.findMany({
            where: { cart: { userId: user.id } },
        });
        return cartItems.reduce((cart: Cart, item) => {
            cart[item.movieId] = {
                id: item.movieId,
                name: item.movieId.toString(),
                quantity: item.quantity,
                price: item.price,
                poster_path: item.poster_path ?? "",
            };
            return cart;
        }, {});
    } else {
        const cookieCart = getCookie();
        return cookieCart;
    }
}

// ####################### Add item to cart ############################
export async function addToCart(item: Item) {
    const user = await getUserSession();
    if (user) {
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

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                movieId_cartId: {
                    movieId: item.id,
                    cartId: cart.id,
                },
            },
        });
        console.log("Poster Path:", item.poster_path);
        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + item.quantity },
            });
            
        } else {
            await prisma.cartItem.create({
                data: {
                    movieId: item.id,
                    cartId: cart.id,
                    quantity: item.quantity,
                    price: item.price,
                    poster_path: item.poster_path
                },
            });
        }
    } else {
        // Handle non-logged-in users as before
        const cart = getCookie();

    if (cart[item.id]) {
        cart[item.id].quantity += item.quantity;
    } else {
        // Ensure that all required fields, including poster_path, are set
        cart[item.id] = {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            poster_path: item.poster_path ?? "",
        };
    }

    setCookie(cart);
    }

    revalidatePath("/", "layout");
}


// ####################### Update item in cart ############################
export async function updateCart(itemId: string, quantity: number) {
    const user = await getUserSession();
    if (user) {
        // Database operations for logged-in users
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                movieId_cartId: {
                    movieId: parseInt(itemId),
                    cartId: user.cartId!,
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

// ####################### Remove item from cart ############################
export async function removeFromCart(itemId: string) {
    try {
        const user = await getUserSession();
        if (user) {

            const parsedItemId = parseInt(itemId, 10);
            if (isNaN(parsedItemId)) {
                throw new Error('Invalid item ID');
            }

            await prisma.cartItem.deleteMany({
                where: {
                    movieId: parsedItemId,
                    cartId: user.cartId!,
                },
            });
        } else {

            const cart = getCookie();
            if (cart[itemId]) {
                delete cart[itemId];
                setCookie(cart);
            } else {
                console.warn(`Item with ID ${itemId} not found in cookie cart.`);
            }
        }

        revalidatePath("/", "layout");
    } catch (error: any) {
        console.error(`Error removing item from cart: ${error.message}`);
    }
}

// ####################### Clear cart ############################
export async function clearCart() {
    const user = await getUserSession();
    if (user) {
        // Database operations for logged-in users
        await prisma.cartItem.deleteMany({
            where: { cartId: user.cartId! },
        });
    } else {
        // Cookie operations for non-logged-in users
        cookies().delete(CART_COOKIE);
    }

    revalidatePath("/", "layout");
}

// ####################### Get cart from cookies ############################
function getCookie(): Cart {
    const cookie = cookies().get(CART_COOKIE);
    try {
        return cookie ? JSON.parse(cookie.value) : {};
    } catch (error) {
        console.error("Error parsing cart cookie:", error);
        return {};
    }
}

// ####################### Set cart in cookies ############################
function setCookie(cart: Cart) {
    cookies().set(CART_COOKIE, JSON.stringify(cart), CART_COOKIE_OPTIONS);
}
