import prisma from '@/lib/prisma'
import { hash } from "bcrypt";
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { z } from 'zod';


const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
});


export async function POST(req: Request) {
    // validate request
    const { name, email, password } = await req.json();

    // validate user
    const user = userSchema.parse({ name, email, password });

    // check if user exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    if (userExists) {
        return NextResponse.json({ error: 'User already exists' });
        
    }

    // hash password
    const hashedPassword = await hash(user.password, 10);

    // create user
    const newUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashedPassword

        }
    })

    revalidatePath('/signin')
    
}