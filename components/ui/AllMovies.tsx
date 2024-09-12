import prisma from "@/lib/prisma";
import Moviecard from "./MovieCard";




export default async function AllMovies() {

    const movies = await prisma.movie.findMany();
    return (
        <div className='movie-cards grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
                movies.map((movie) => (
                    <Moviecard key={movie.id}
                        movie={movie} />
                ))
            }
        </div>
    )
}