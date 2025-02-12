"use server";

import { revalidatePath } from "next/cache";
import { validateEditMovie } from "./validation-schema";
import prisma from "@/lib/prisma";
import { validateMovie } from "./validation-schema";
import { redirect } from "next/navigation";
import { Movie } from "@prisma/client";

type updateMovie = Omit<Movie, "createdAt" | "updatedAt">;

export async function EditMovie(id: number, formData: FormData) {
  const result = await validateEditMovie(formData);
  if (!result.success) {
    console.log(result.errors);
    return result;
  }
  const editmovie = result.data;
  await prisma.movie.update({
    where: {
      id: id,
    },
    data: {
      title: editmovie.title,
      release_date: Number(editmovie.releaseYear),
      overview: editmovie.overview,
      poster_path: editmovie.posterPath,

      // genre: editmovie.genre,
      price: Number(editmovie.price),
    },
  });
  revalidatePath("/moviesdb-page");
  redirect("/moviesdb-page");
}
