
import { NextRequest, NextResponse } from "next/server";
import { CART_COOKIE, CART_COOKIE_OPTIONS } from "./constants";

export function middleware(req: NextRequest) {
  const cart = req.cookies.get(CART_COOKIE);
  const response = NextResponse.next();

  //################################### Check if cart cookie exists ###################################
  if (!cart) {
    // ################################### Create cart cookie ###################################
    response.cookies.set(CART_COOKIE, JSON.stringify({}), CART_COOKIE_OPTIONS);
  }

  return response;
}
