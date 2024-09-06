// app/api/fetchMovies/route.js
import prisma from "@/lib/prisma";

export async function GET(req: Request) {

        const [movieResponse, genreResponse] = await Promise.all([
            fetch('https://api.themoviedb.org/3/discover/movie?api_key=4bd1384ac2f13ea51c45906c0d46fd27'),
            fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4bd1384ac2f13ea51c45906c0d46fd27')
        ]);
         
        if (!movieResponse.ok && !genreResponse.ok) {
            throw new Error('API call failed with status');
        }

        const  moviesData  = await movieResponse.json();
        const genresData  = await genreResponse.json();
 
        if (!moviesData.results || !genresData.genres) {
            throw new Error('Unexpected API response structure.');
        }

        const { genres } = genresData
        const { results } = moviesData

        await prisma.genre.createMany({
            data: genres.map((genre: { id: number; name: string }) => ({
                id: genre.id,
                name: genre.name,
            })),
            skipDuplicates: true,
        });

        for (const movie of results) {
            const insertMovie = await prisma.movie.upsert({
                where: { id: movie.id },
                update: {},
                create: {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path,
                    release_date: new Date(movie.release_date).getFullYear(),
                    genres: movie.genres,
                    price: Math.round(Math.random() * 100) +10,
                }
            });

            await prisma.movieGenre.createMany({
                data: movie.genre_ids.map((genreId: number) => ({
                    movieId: insertMovie.id,
                    genreId: genreId
                })),
                skipDuplicates: true
            })
        }
        
        

        console.log('Movies fetched:', moviesData);
        console.log('Genres fetched:', genresData);

        return new Response(JSON.stringify({ message: 'Movies fetched and stored successfully' }), { status: 200 });
}



