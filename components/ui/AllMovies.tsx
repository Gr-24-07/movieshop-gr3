import  prisma  from "@/lib/prisma";
import MovieCard from "./MovieCard";



export default async function AllMovies() {

    const movies = await prisma.movie.findMany();
    return (
        <div className='movie-cards mt-10'>
            {
                movies.map((movie) => (
                    <MovieCard key={movie.id}
                    movie={movie} />
                ))
            }
        </div>
    )
}