'use server';
import prisma from '@/lib/prisma'
import { hash } from "bcrypt";
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { z } from 'zod';


const userSchema = z.object({

    name: z.string().min(1, "You name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 5 characters long"),
    
});


export async function registerUser(formData: FormData) {
    const data = Object.fromEntries(formData);       
    // validate user
    const user = await userSchema.parseAsync(data);
    console.log(user);

    // check if user exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    // return error if user exists
    if (userExists) {
        return NextResponse.json({ error: 'User already exists' });
        
    }
    // hash password
    const hashedPassword = await hash(user.password, 10);

    // create user
    await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword

            }
    })
    revalidatePath('/auth/signin');
}

