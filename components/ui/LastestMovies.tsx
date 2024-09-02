import prisma  from "@/lib/prisma";
import Moviecard from "./moviecard";



export default async function TopFiveLastestMovies() {

    const recentMovies = await prisma.movie.findMany({
        orderBy: {
            release_date: 'desc',
        }, take: 5
    });
    
    return (

        <div className="mt-10 p-10">
            <div className='text-center items-center pb-8'>
                <h1 className='text-xl font-bold '>Recent Movies</h1>
                <p>Lastest movies ordered by release date</p>
            </div>

            <div className='grid grid-cols-5 gap-4'>
            {
                recentMovies.map((movie) => (
                    <Moviecard key={movie.id} movie={movie} />
                ))
            }
            </div>
        </div>
    )
}