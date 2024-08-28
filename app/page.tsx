// import prisma from "@/lib/prisma";
// import MovieCard, { MovieProp } from "./components/MovieCard";
// import AllMovies from "./components/AllMovies";

// export default  async function Home() {
//     return (
//         <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
//             <h2 className="text-3xltext-center font-bold">Movies</h2>
    
//             <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
//                 <AllMovies />
//             </section>
//         </main>
//     );
// }

// app/page.js (or another page/component)

'use client';

import React from 'react';

const fetchAndStoreMovies = async () => {
  try {
    const response = await fetch('/api/movies-api');
    if (!response.ok) {
      throw new Error('Failed to fetch data from API route');
    }
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error('Error fetching and storing movies:', error);
  }
};

const Page = () => {
  return (
    <div>
      <h1>Movie Data</h1>
      <button onClick={fetchAndStoreMovies}>Fetch and Store Movies</button>
    </div>
  );
};

export default Page;