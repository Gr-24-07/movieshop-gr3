"use server";

import { revalidatePath } from "next/cache";
import { validateMovie } from "./validation-schema";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Movies } from "@prisma/client";

type updateMovie = Omit<Movies, "createdAt" | "updatedAt">;

export async function EditMovie(id: number, formData: FormData) {
  const result = await validateMovie(formData);
  if (!result.success) {
    return result;
  }
  const editmovie = result.data;
  await prisma.movies.update({
    where: {
      id: id,
    },
    data: {
      title: editmovie.title,
      releaseYear: Number(editmovie.releaseYear),
      posterPath: editmovie.posterPath,
      // genre: editmovie.genre,
      price: Number(editmovie.price),
    },
  });
  revalidatePath("/moviesdb-page");
  redirect("/moviesdb-page");
}
