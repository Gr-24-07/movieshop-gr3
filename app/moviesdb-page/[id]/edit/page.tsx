import { EditMovie } from "@/app/actions/edit";
import { Button } from "@/components/ui/button";
import Edit from "@/components/ui/edit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function MovieEditPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      // Include the genres field
      genres: {
        select: {
          genre: true,
        },
      },
    },
  });
  if (!movie) {
    return notFound();
  }
  const action = EditMovie.bind(null, movie.id);

  return (
    <form className="flex flex-col gap-2 m-4 p-4" action={action}>
      <div className="space-y-1">
        <Label htmlFor="title" className="text-base">
          Title
        </Label>
        <Input
          className="pl-4 text-base"
          defaultValue={movie.title}
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="releaseYear" className="text-base">
          Release Year
        </Label>
        <Input
          className="pl-4 text-base"
          defaultValue={movie.release_date}
          type="text"
          name="releaseYear"
          id="releaseYear"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="genre" className="text-base">
          Genre
        </Label>
        <Input
          className="pl-4 text-base"
          defaultValue={movie.genres.map((x) => x.genre.name).join(" | ")}
          type="text"
          name="genre"
          id="genre"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="price" className="text-base">
          Price
        </Label>
        <div className="relative">
          <Input
            className="pl-8 text-base"
            defaultValue={movie.price}
            type="text"
            name="price"
            id="price"
          />
          <span className="absolute top-0 left-0 inset-y-0 flex items-center justify-center px-4 pointer-events-none">
            $
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="overview" className="text-base">
          Overview
        </Label>
        <textarea
          className="font-normal pl-4 text-base block w-full"
          defaultValue={movie.overview}
          name="overview"
          id="overview"
          rows={3}
        ></textarea>
      </div>
      <div className="space-y-1">
        <Label htmlFor="actors" className="text-base">
          Actors
        </Label>
        <Input
          className="pl-4 text-base"
          // defaultValue={movie.actors}
          type="text"
          placeholder=" Edit actors..."
          name="actors"
          id="actors"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="director" className="text-base">
          Director
        </Label>
        <Input
          className="pl-4 text-base"
          // defaultValue={movie.director}
          type="text"
          placeholder=" Edit director..."
          name="director"
          id="director"
        />
      </div>
      <Edit />
    </form>
  );
}
