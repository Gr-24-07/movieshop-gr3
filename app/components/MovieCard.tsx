
import Movie from '@prisma/client'

export interface MovieProp {
    id: number;
    title: string;
    poster_path: string;
    release_date: number;
    genres: [string];
    price: number;
}
  
interface Prop {
    movie: MovieProp;
    index: number;
}
  
export default async function MovieCard({movie}: Prop) {
    

    return (
        <div className='movie-card'>
            <div className="bg-white max-w-sm rounded relative w-full" key={movie.id}>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                    <div className="runded-lg">
                        <div className="w-full">
                            <div className="relative w-full h-[37vh]">
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}className="h-full w-full object-cover object-center lg:h-full lg:w-full" alt='movie poster'/>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}className="h-full w-full object-cover object-center lg:h-full lg:w-full" alt='movie poster'/>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0"></span>{movie.release_date}
                                    </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{movie.title}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{movie.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
