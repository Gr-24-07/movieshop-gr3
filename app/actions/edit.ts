"use server";

import { revalidatePath } from "next/cache";
import { validateMovie } from "./validation-schema";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Movie } from "@prisma/client";

type updateMovie = Omit<Movie, "createdAt" | "updatedAt">;

export async function EditMovie(id: number, formData: FormData) {
  const result = await validateMovie(formData);
  if (!result.success) {
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
      poster_path: editmovie.posterPath,
      overview: "",
      // genre: editmovie.genre,
      price: Number(editmovie.price),
    },
  });
  revalidatePath("/moviesdb-page");
  redirect("/moviesdb-page");
}
