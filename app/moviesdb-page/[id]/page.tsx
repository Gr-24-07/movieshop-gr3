import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await prisma.movies.findUnique({
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

  //const action = updateMovie.bind(null, movie.id);
  const isAdmin = true;

  return (
    <div className="flex w-full">
      <div className="p-4 max-6xl mx-auto">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
          width={300}
          height={300}
          className="rounded-lg"
          alt={""}
        />
      </div>
      <div className="container mx-auto p-4 flex">
        <aside className="w-1/3">
          <h2 className="text-2xl ">{movie.title}</h2>
          <p>{movie.genres.map((x) => x.genre.name).join(",")}</p>
          <p>{movie.releaseYear}</p>
          <p>{movie.price}</p>
          <p>DUMMY OVERVIEW</p>
          {isAdmin && <p>Is Admin</p>}
        </aside>
      </div>
    </div>
  );
}
