"use server";
import prisma from "@/lib/prisma";
import { validateMovie } from "./validation-schema";
import { revalidatePath } from "next/cache";

export default async function AddMovie(formData: FormData) {
  await new Promise((r) => setTimeout(r, 1000));

  const result = await validateMovie(formData);
  if (!result.success) {
    return result;
  }

  const newmovie = result.data;
  await prisma.movie.create({
    data: {
      title: newmovie.title,
      release_date: Number(newmovie.releaseYear),
      poster_path: newmovie.posterPath,
      overview: "",
      //genre: newmovie.genre,
      price: Number(newmovie.price),
    },
  });

  revalidatePath("/moviesdb-page");
}
