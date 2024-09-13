'use server';
import { cookies } from 'next/headers';
import { Status } from '@prisma/client';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { CART_COOKIE } from '@/constants';

function getCartFromCookies(): any {
    const cartCookie = cookies().get(CART_COOKIE);
    if (!cartCookie) {
        throw new Error('Cart cookie not found');
    }

    try {
        const cart = JSON.parse(cartCookie.value);
        if (!cart || Object.keys(cart).length === 0) {
            throw new Error('Cart is empty');
        }
        return cart;
    } catch (error) {
        console.error('Error parsing cart cookie:', error);
        throw new Error('Invalid cart data in cookies');
    }
}

// ##################### Server Action to process checkout, including user information ###############
export default async function checkoutAction(
    userId: string | null,
    userInfo: { fullName: string; email: string; address: string; phoneNumber: string; city: string; zipCode: string; country: string }
) {
    let cartItems: Array<{ id: number; title: string; quantity: number; price: number; poster_path?: string }> = [];

    if (userId) {
        //##################### Fetch cart from the database for logged-in users #####################
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        });

        if (!cart || !cart.items || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        cartItems = cart.items.map((item) => ({
            id: item.movieId,
            title: item.title || '',
            quantity: item.quantity,
            price: item.price,
            poster_path: item.poster_path
        }));

        //##################### Delete all items from the cart after checkout #####################
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

    } else {
        //##################### Fetch cart from cookies for guest users #####################
        const cookieCart = getCartFromCookies();
        cartItems = Object.values(cookieCart).map((item: any) => ({
            id: item.id,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            poster_path: item.poster_path 
        }));

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            throw new Error('Cart is empty');
        }

        // #####################Delete the cart cookie after checkout #####################
        cookies().delete(CART_COOKIE);
    }

    //##################### Debugging: Log cartItems to verify its structure #####################
    console.log('Cart Items:', cartItems);

    //##################### Calculate the total amount, ensuring cartItems is an array #####################
    const totalAmount = cartItems.reduce(
        (total: number, item: { price: number; quantity: number }) => total + item.price * item.quantity,
        0
    );

    //##################### Simulate payment success #####################
    const paymentSuccess = true;  // Replace with actual payment integration if needed

    if (!paymentSuccess) {
        throw new Error('Payment failed');
    }

    //##################### Prepare order data, ensuring no user field is included when userId is null #####################
    const orderData = {
        totalAmount,
        status: Status.PENDING,
        orderItems: {
            create: cartItems.map((item) => ({
                movieId: item.id,
                quantity: item.quantity,
                priceAtPurchase: item.price,
            })),
        },
        //##################### Store additional user information in the order #####################
        fullName: userInfo.fullName,
        email: userInfo.email,
        address: userInfo.address,
        city: userInfo.city,
        zipCode: userInfo.zipCode,
        country: userInfo.country,
        phoneNumber: userInfo.phoneNumber,
        user: userId ? { connect: { id: userId } } : undefined,
    };

    if (userId) {
        //##################### Store userId in the order #####################
        (orderData as unknown as { userId: string })['userId'] = userId;
    }
    
    await prisma.order.create({
        data: orderData,
    });

    //##################### Redirect to the success page #####################
    redirect('/cart/checkout/success'); 
}
