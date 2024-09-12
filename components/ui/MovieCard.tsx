"use client";
import Link from "next/link";

import Image from "next/image";
import { Button } from "./button";
import { useCart } from "@/context/cartContext";

export interface MovieProp {
  id: number;
  title: string;
  release_date: number;
  poster_path: string;
  price: number;
  overview: string;
}

interface Prop {
  movie: MovieProp;
}

export default function Moviecard({ movie }: Prop) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const item = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      movieId: movie.id,
      name: movie.title,
      quantity: 1,
      price: movie.price,
    };
    addItem(item);
  };


  return (
    <div
      className="grid grid-cols-1 border border-black-100 rounded-xl movie-card shadow-lg hover:shadow-2xl "
      key={movie.id}
    >
      <div className="w-full">
        <div className="relative">
          <Link href="#">
            <Image
              width={500}
              height={750}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt="Movie Product"
              className="rounded-t-xl"
            />
          </Link>
        </div>
        <div className="p-4 bg-background">
          <h3 className="text-xl border">{movie.title}</h3>
          <p className="text-sm text-muted-foreground text-slate-500">
            {movie.release_date}
          </p>
          <div className="flex items-center justify-between mt-4">
            <h4 className="text-base font-semibold md:text-lg">
              $ {movie.price}
            </h4>
            <Button
              className="btn rounded"
              size={"sm"}
              value="Buy Now"
              onClick={handleAddToCart}
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
