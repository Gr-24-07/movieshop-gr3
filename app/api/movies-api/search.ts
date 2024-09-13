import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function SearchHandler(req:NextApiRequest, res: NextApiResponse) {

    const {title} = req.query;
    try {
        const movies = await prisma.movie.findMany({
            where: {
                title: {
                    contains: title as string,
                    mode: 'insensitive'
                }
            }
        });
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }

    
}