import  prisma  from "@/lib/prisma";
import Moviecard from "./Moviecard";




export default async function AllMovies() {

    const movies = await prisma.movie.findMany();
    return (
        <div className='movie-cards mt-10'>
            {
                movies.map((movie) => (
                    <Moviecard key={movie.id}
                    movie={movie} />
                ))
            }
        </div>
    )
}