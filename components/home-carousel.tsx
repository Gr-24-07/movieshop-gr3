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
          <>
            <CarouselItem
              key={index}
              className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              {/* <div className="p-1">
      <Card>
        <CardContent className="flex aspect-square items-center justify-center p-6">
          <span className="text-3xl font-semibold">{index + 1}</span>
        </CardContent>
      </Card>
    </div> */}
              <div>
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  width={300}
                  height={300}
                  alt={movie.title}
                  className="rounded-lg"
                />
              </div>
            </CarouselItem>
          </>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
