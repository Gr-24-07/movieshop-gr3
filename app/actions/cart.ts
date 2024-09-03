'use server'

import { CART_COOKIE, CART_COOKIE_OPTIONS } from "@/constants";
import { cookies } from "next/headers";

export type CartItem = {

    id: string;
    name: string;
    quantity: number;
    price: number;

}
export type Cart = Record<string, CartItem>

// Get cart
export async function getCart() { 
    return getCookie()
}

// ####################### Add item to cart ############################
export async function addToCart(item: CartItem) {
    const cart = getCookie()
    const cartItems = cart[item.id]

    if (cartItems) {    
        cart[item.id].quantity += item.quantity
    } else {
        cart[item.id] = item
    }
    setCookie(cart)
}


//####################### Get cart from cookies ############################
function getCookie() {
    const cookie = cookies().get(CART_COOKIE);
    if (cookie) {
        return JSON.parse(cookie.value) ?? {};
    } else {
        return {};
    }
}
// ####################### Set cart in cookies ############################

function setCookie(cart: Cart) {
    cookies().set(CART_COOKIE, JSON.stringify(cart), CART_COOKIE_OPTIONS)
}   

// Clear cart
export async function clearCart(cart: Cart, item: CartItem) {
    delete cart[item.id]
    setCookie(cart)
}