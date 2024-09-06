import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const CART_COOKIE = "__cart";

export const CART_COOKIE_OPTIONS: Partial<ResponseCookie> = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "production",
    maxAge: 60 * 60 * 24 * 30,
}