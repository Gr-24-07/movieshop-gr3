import { prisma } from "@/lib/prisma";
import MovieCard from "./components/MovieCard";



export default async function Books() {

    const movies = await prisma.movies.findMany();
    return (
        <div className='Book-cards mt-10'>
            {
                movies.map((movie) => (
                    <MovieCard key={movie.id} 
                        title={movie.title}
                        poster_path={movie.posterPath}
                        release_date={movie.releaseYear} 
                    />
                ))
            }
        </div>
    )
}