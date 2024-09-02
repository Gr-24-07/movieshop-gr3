import prisma from "@/lib/prisma";
import Moviecard from "./MovieCard";



export default async function TopFiveOldestMovies() {

    const oldestMovies = await prisma.movie.findMany({
        orderBy: {
            release_date: 'asc',
        }, take: 5
    });

    return (

        <div className="mt-10 p-10">
            <div className='text-center items-center pb-8'>
                <h1 className='text-2xl font-bold '>Oldest Movies</h1>
                <p>Oldest, classic movies ordered by release date</p>
            </div>
            
            <div className='grid grid-cols-5 gap-4'>
            {
                oldestMovies.map((movie) => (
                    <Moviecard key={movie.id} movie={movie} />
                ))
            }
            </div>
        </div>
    )
}