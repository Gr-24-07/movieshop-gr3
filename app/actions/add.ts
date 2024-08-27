"use server";
import { prisma } from "@/lib/prisma";
import { validateMovie } from "./validation-schema";
import { revalidatePath } from "next/cache";

export default async function AddMovie(formData: FormData) {
  await new Promise((r) => setTimeout(r, 1000));

  const result = await validateMovie(formData);
  if (!result.success) {
    return result;
  }

  const newmovie = result.data;
  await prisma.movies.create({
    data: {
      title: newmovie.title,
      releaseYear: Number(newmovie.releaseYear),
      posterPath: newmovie.posterPath,
      //genre: newmovie.genre,
      price: Number(newmovie.price),
    },
  });

  revalidatePath("/moviesdb-page");
}
