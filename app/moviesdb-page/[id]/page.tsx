import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MoviePage({
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

  return (
    <div className="flex w-full">
      <div className="p-4 max-6xl mx-auto">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          width={300}
          height={300}
          className="rounded-lg"
          alt={""}
        />
      </div>
      <div className="container mx-auto p-4 flex">
        <aside className="w-4/5 space-y-4">
          <h2 className="text-2xl ">
            {movie.title}
            <span className="text-sm"> ({movie.release_date})</span>
          </h2>
          <p>{movie.genres.map((x) => x.genre.name).join(" | ")}</p>
          <h3 className="font-bold">
            Price:
            <span className="font-normal"> ${movie.price}</span>
          </h3>
          <h3 className="font-bold">
            Overview:
            <span className="font-normal"> {movie.overview}</span>
          </h3>
          <h3 className="font-bold">
            Actors:
            <span className="font-normal"> Matt Demon, Jackie Chan, ... </span>
          </h3>
          <h3 className="font-bold">
            Director:
            <span className="font-normal"> David Fincher </span>
          </h3>

          <Link href={`/moviesdb-page/${movie.id}/edit`}>
            <Button
              type="submit"
              className="mt-4 w-full btn-signin  rounded-xl"
            >
              Update
            </Button>
          </Link>
        </aside>
      </div>
    </div>
  );
}
