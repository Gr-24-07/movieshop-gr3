import MovieCard, { MovieProp } from "./components/MovieCard";

export default  async function Home() {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4bd1384ac2f13ea51c45906c0d46fd27`);
    const data = await response.json()
    console.log(data)
    return (
        <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
            <h2 className="text-3xltext-center font-bold">Movies</h2>
    
            <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {data.results.map((movie: MovieProp, index:number) => (
                        <MovieCard key={movie.id} movie={movie} index={index} />
                    ))
                }
            </section>
        </main>
    );
}
