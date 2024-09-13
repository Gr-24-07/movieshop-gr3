import { SearchBar } from '@/components/search';
import prisma from '@/lib/prisma';
import { redirect, RedirectType } from 'next/navigation';
import React, { Suspense } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Moviecard from '@/components/ui/MovieCard';
import GenresPage from './genre';


const pageSize = 12;
export default async function MoviesPage({searchParams}: {searchParams?: {query?: string; page?: string; genre: string};},  ) {
    const query = searchParams?.query || '';
    const genre = searchParams?.query || '';
    const currentpage = Number(searchParams?.page) || 1;

    const genres = await prisma.genre.findMany({
        select: {
            id: true,
            name: true
        },
        
    });

    const movies = await prisma.movie.findMany({
        where: {
            title: {
                contains: query,
                mode: 'insensitive'
            },
        },
        include: {
            genres: true
        },
        take: pageSize,
        skip: (currentpage - 1) * pageSize,
    });
    const totalMovies = await prisma.movie.count();
    const totalPages = Math.ceil(totalMovies / pageSize);
 
  return (
    <div>
      <main className="container mx-auto min-h-screen">
        <h1 className="text-3xl font-bold text-center my-10">All Movies</h1>

        {
          genre && <p className="text-center">Showing movies from {genre}</p>
        }
        <div className="flex gap-8 justify-between my-10">
          <SearchBar />
          <GenresPage genres={genres} />
        </div>
        
          <div className='movie-cards grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8  my-10'>
            <Suspense key={query + currentpage}>
            {
              movies.map((movie) => (
                <Moviecard key={movie.id} movie={movie}/>
              ))
            }
            </Suspense>
          </div>
        
        <Pagination  className='my-20'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/movies?page=${Math.min(currentpage - 1, 1)}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={`/movies?page=${currentpage}`}
                isActive
              >
                {currentpage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`/movies?page=${Math.min(
                  totalPages,
                  currentpage + 1
                )}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
}
