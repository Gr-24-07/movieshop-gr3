import prisma from "@/lib/prisma"

export async function Actors() {

    const actors = await prisma.actor.findMany();
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">All Actors</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {actors.map((actor) => (
                    <div className="bg-background rounded-lg overflow-hidden shadow-md">
                        <img
                            src={`https://image.tmdb.org/t/p/original/${actor.imagePath}`}
                            alt="Actor 1"
                            width="300"
                            height="300"
                            className="w-full h-60 object-cover"
                            style={{ aspectRatio: "300/300", objectFit: "cover" }}
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{actor.name}</h2>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}
