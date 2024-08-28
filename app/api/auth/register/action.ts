'use server';
import prisma from '@/lib/prisma'
import { hash } from "bcrypt";
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { z } from 'zod';


const userSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
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
    const newUser = await prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: hashedPassword

        }
    })

    redirect("/");
    
}


