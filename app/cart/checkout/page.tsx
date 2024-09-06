import React from 'react'
import { CheckOut } from '../../../components/ui/check-out'

export default function CheckoutPage() {

    return (
        <div>
            <h1 className='text-3xl text-center mt-10'>Checkout</h1>
            <p className='text-center mt-5'>Thank you for your order!</p>

            <div>
                <CheckOut />
            </div>

        </div>
    )
}
