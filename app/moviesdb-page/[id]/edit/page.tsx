import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  // const action = updateMovie.bind(null, movie.id);

  return (
    <form className="flex flex-col gap-2 m-4 p-4">
      <input
        defaultValue={movie.title}
        type="text"
        placeholder="Edit Title..."
        name="title"
      />
      <span className="text-sm"> ({movie.release_date})</span>

      <input
        defaultValue={movie.genres.map((x) => x.genre.name).join(" | ")}
        type="text"
        placeholder="Edit genre..."
        name="genre"
      />
      <h3 className="font-bold">Genre: </h3>
      <input
        defaultValue={movie.genres.map((x) => x.genre.name).join(" | ")}
        type="text"
        placeholder="Edit genre..."
        name="genre"
      />
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
      <Link href={`/moviesdb-page/${movie.id}`}>
        <Button type="submit" className="mt-4 w-full btn-signin rounded-xl">
          Save changes
        </Button>
      </Link>
    </form>
  );
}
