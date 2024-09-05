"use client";

import { Movie } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCart } from "@/context/cartContext";

export type HomeCarouselProps = {
  carouselMovies?: Movie[];
};

export default function HomeCarousel({
  carouselMovies = [],
}: HomeCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {carouselMovies.map((movie, index) => (
          <CarouselItem
            key={`carousel-${movie.id}`}
            className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <MovieCard movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function MovieCard({ movie }: { movie: Movie }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const item = {
      id: movie.id,
      movieId: movie.id,
      name: movie.title,
      quantity: 1,
      price: movie.price,
    };
    addItem(item);
  };

  return (
    <Card>
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          width={300}
          height={300}
          alt={movie.title}
          className="rounded-t-lg"
        />
      </div>
      <CardContent className="pt-4 space-y-1.5">
        <h2 className="font-bold">{movie.title}</h2>
        <p className="text-slate-600 text-xs font-medium">
          {movie.release_date}
        </p>
        <div className="flex justify-between items-center">
          <p className="font-bold">${movie.price.toFixed(2)}</p>
          <Button onClick={handleAddToCart} className="btn">
            Buy now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
