import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        //################################### Fetch movies and genres from TMDB API  #################################
        const [movieResponse, genreResponse] = await Promise.all([
            fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=4bd1384ac2f13ea51c45906c0d46fd27'),
            fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4bd1384ac2f13ea51c45906c0d46fd27')
        ]);

        if (!movieResponse.ok || !genreResponse.ok) {
            throw new Error('One or more API calls failed.');
        }

        const moviesData = await movieResponse.json();
        const genresData = await genreResponse.json();

        if (!moviesData.results || !genresData.genres) {
            throw new Error('Unexpected API response structure.');
        }

        const { genres } = genresData;
        const movies = moviesData.results;

        //################################### Fetch multiple pages of actors to get at least 60 actors  #################################
        const actors = [];
        for (let page = 1; page <= 3; page++) {
            const actorsResponse = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=4bd1384ac2f13ea51c45906c0d46fd27&page=${page}`);
            if (!actorsResponse.ok) {
                console.error(`Failed to fetch actors on page ${page}:`, actorsResponse.statusText);
                continue; 
            }

            const actorsData = await actorsResponse.json();
            actors.push(...actorsData.results);
            
        }
        

        // ################################### Insert genres into the database #################################
        await prisma.genre.createMany({
            data: genres.map((genre: { id: number; name: string; }) => ({
                id: genre.id,
                name: genre.name,
            })),
            skipDuplicates: true,
        });

        //################################### Insert actors into the database ###################################
        await prisma.actor.createMany({
            data: actors.map((actor: { id: number; name: string; profile_path: string | null }) => ({
                id: actor.id,
                name: actor.name,
                imagePath: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : null, // Match with the correct field name
            })),
            skipDuplicates: true,
        });

        //################################### Get existing actor IDs from the database  ###################################
        const existingActorIds = new Set(
            (await prisma.actor.findMany({
                select: { id: true }
            })).map(actor => actor.id)
        );

        //################################### Iterate over movies to store them and associate genres and actors ###################################
        for (const movie of movies) {
            // Upsert the movie into the database
            const insertMovie = await prisma.movie.upsert({
                where: { id: movie.id },
                update: {},
                create: {
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path,
                    release_date: new Date(movie.release_date).getFullYear(),
                    price: Math.round(Math.random() * 100) + 10,
                },
            });

            //################################### Associate the movie with genres ###################################
            await prisma.movieGenre.createMany({
                data: movie.genre_ids.map((genreId: number) => ({
                    movieId: insertMovie.id,
                    genreId: genreId,
                })),
                skipDuplicates: true,
            });

            //################################### Fetch and associate actors with the movie ###################################
            const movieDetailsRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=4bd1384ac2f13ea51c45906c0d46fd27`);
            if (movieDetailsRes.ok) {
                const movieDetails = await movieDetailsRes.json();
                if (movieDetails.cast) {
                    const actorsToInsert = movieDetails.cast
                        .filter((actor: { id: number; }) => existingActorIds.has(actor.id)) // Ensure actor exists
                        .map((actor: { id: number; }) => ({
                            movieId: insertMovie.id,
                            actorId: actor.id,
                        }));

                    if (actorsToInsert.length > 0) {
                        await prisma.movieActor.createMany({
                            data: actorsToInsert,
                            skipDuplicates: true,
                        });
                    }
                }
            }
        }

        console.log('Movies, genres, and actors fetched and associated successfully.');
        return new Response(JSON.stringify({ message: 'Movies fetched, stored, and associated successfully.' }), { status: 200 });
    } catch (error: any) {
        console.error('Error:', error.message);
        return new Response(JSON.stringify({ message: 'Failed to fetch, store, and associate data.' }), { status: 500 });
    }
}
