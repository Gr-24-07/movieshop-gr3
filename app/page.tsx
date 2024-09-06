import HomeCarousel from "@/components/home-carousel";
import { Banner } from "@/components/ui/banner";
import RecentMovies from "@/components/ui/LastestMovies";
import TopFiveOldestMovies from "@/components/ui/OldestMovies";
import prisma from "@/lib/prisma";

export default async function Home() {
  const topMoviesPromise = prisma.movie.findMany({
    take: 5,
    orderBy: { OrderItem: { _count: "desc" } },
  });

  const cheapestMoviesPromise = prisma.movie.findMany({
    take: 5,
    orderBy: { price: "asc" },
  });
  const recentMoviesPromise = prisma.movie.findMany({
    take: 5,
    orderBy: { release_date: "desc" },
  });

  const oldestMoviesPromise = prisma.movie.findMany({
    take: 5,
    orderBy: { release_date: "asc" },
  });

  const [topMovies, cheapestMovies, recentMovies, oldestMovies] =
    await Promise.all([
      topMoviesPromise,
      cheapestMoviesPromise,
      recentMoviesPromise,
      oldestMoviesPromise,
    ]);

  return (
    <>
      <div>
        <Banner />
      </div>
      <main className="container mx-auto min-h-screen">
        <div className="sm:px-14 mt-8 mb-8 space-y-3">
          <h2 className="text-xl font-bold">Top 5 most purchased Movies</h2>
          <HomeCarousel carouselMovies={topMovies} />
        </div>
        <div className="sm:px-14 mt-8 mb-8 space-y-3">
          <h2 className="text-xl font-bold">Top 5 cheapest Movies</h2>
          <HomeCarousel carouselMovies={cheapestMovies} />
        </div>

        <div className="sm:px-14 mt-8 mb-8 space-y-3">
          <h2 className="text-xl font-bold">Top 5 Latest Movies</h2>
          <HomeCarousel carouselMovies={recentMovies} />
        </div>

        <div className="sm:px-14 mt-8 mb-8 space-y-3">
          <h2 className="text-xl font-bold">Top 5 Oldest Movies</h2>
          <HomeCarousel carouselMovies={oldestMovies} />
        </div>
      </main>
    </>
  );
}

// "use client";

// import Form from "../components/ui/form";

// const fetchAndStoreMovies = async () => {
//   try {
//     const response = await fetch("/api/movies-api");

//     const result = await response.json();
//     console.log(result.message);
//   } catch (error) {
//     console.error("Error fetching and storing movies:", error);
//   }
// };

// const Page = () => {
//   return (
//     <>
//       <div>
//         <h1>Movie Data</h1>
//         <button onClick={fetchAndStoreMovies}>Fetch and Store Movies</button>
//       </div>
//       <Form />
//     </>
//   );
// };

// export default Page;
