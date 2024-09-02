import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const CART_COOKIE = "__cart";

export const CART_COOKIE_OPTIONS  = {

    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "production",
    maxAge: 60 * 60 * 24 * 30,

} as Partial<ResponseCookies>