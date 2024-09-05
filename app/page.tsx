import HomeCarousel from "@/components/home-carousel";
import Form from "../components/ui/form";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

const fetchAndStoreMovies = async () => {
  "use server";

  try {
    const response = await fetch("/api/movies-api");
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error("Error fetching and storing movies:", error);
  }
};

export default async function HomePage() {
  const topMovies = await prisma.movie.findMany({ take: 5 });

  const cheapestMovies = await prisma.movie.findMany({
    take: 5,
    orderBy: { price: "desc" },
  });
  const recentMovies = await prisma.movie.findMany({
    take: 5,
    orderBy: { release_date: "desc" },
  });

  const oldestMovies = await prisma.movie.findMany({
    take: 5,
    orderBy: { release_date: "asc" },
  });

  return (
    <main className="container my-8">
      <form action={fetchAndStoreMovies}>
        <h1 className="text-3xl font-bold">Movie Data</h1>
        <Button>Fetch and Store Movies</Button>
      </form>

      <div className="px-14 mt-8 mb-8">
        <h1 className="text-xl font-bold">Top 5 most purchased Movies</h1>
        <HomeCarousel carouselMovies={topMovies} />
      </div>
      <div className="px-14 mt-8 mb-8">
        <h1 className="text-xl font-bold">Top 5 cheapest Movies</h1>
        <HomeCarousel carouselMovies={cheapestMovies} />
      </div>

      <div className="px-14 mt-8 mb-8">
        <h1 className="text-xl font-bold">Top 5 Latest Movies</h1>
        <HomeCarousel carouselMovies={recentMovies} />
      </div>

      <div className="px-14 mt-8 mb-8">
        <h1 className="text-xl font-bold">Top 5 Oldest Movies</h1>
        <HomeCarousel carouselMovies={oldestMovies} />
      </div>
      <Form />
    </main>
  );
}
