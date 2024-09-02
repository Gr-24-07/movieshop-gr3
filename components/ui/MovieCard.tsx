
import Link from "next/link"


import Image from 'next/image';
import { Button } from "./Button";

export interface MovieProp {
    id: number;
    title: string;

    release_date: number;
    poster_path: string;

    price: number;
}
  
interface Prop {
    movie: MovieProp;
}

export default function Moviecard({movie}: Prop) {
    return (
        <div className="grid grid-cols-1 border border-black-100 rounded-xl movie-card" key={movie.id}>
            <div className="w-full">
                <div className="relative">
                    <Link href="#">
                        <img
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Movie Product"
                            className="rounded-t-xl"
                        />
                    </Link>
                
                </div>
                <div className="p-4 bg-background">
                    <h3 className="text-lg font-semibold md:text-xl">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground text-slate-500">{movie.release_date}</p>
                    <div className="flex items-center justify-between mt-4">
                        <h4 className="text-base font-semibold md:text-lg">$ {movie.price}</h4>
                        <Button className="btn rounded" size={"sm"} value="Buy Now">Buy now </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
