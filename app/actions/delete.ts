"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function DeleteMovie(id: number) {
  try {
    await prisma.movie.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }
  revalidatePath("/moviesdb-page");
}
