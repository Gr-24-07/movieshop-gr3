import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import DeleteButton from "../../components/ui/delete-button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function MoviesDBPage() {
  const movies = await prisma.movie.findMany({
    include: {
      genres: {
        select: {
          genre: true,
        },
      },
    },
  });

  return (
    <>
      <header>
        <h1 className="container mx-auto p-4 text-3xl font-bold text-center mb-4">
          MoviesDB Page
        </h1>
      </header>
      <main>
        <div>
          <Table>
            <TableCaption className="font-bold ">
              A list of available movies.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Release Year</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Edit</TableHead>
                <TableHead className="text-right">Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {" "}
              {movies.map((movies) => (
                <TableRow key={movies.id}>
                  <TableCell className="font-medium">{movies.title}</TableCell>
                  <TableCell>{movies.release_date}</TableCell>
                  <TableCell>
                    {movies.genres.map((genre) => genre.genre.name).join(",")}
                  </TableCell>
                  <TableCell className="text-right">{movies.price}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/moviesdb-page/${movies.id}`}>
                        <Pencil />
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteButton id={movies.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
