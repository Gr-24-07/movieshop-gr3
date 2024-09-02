"use client";

import { EditMovie } from "@/app/actions/edit";
import { Movie } from "@prisma/client";
import EditButton from "./edit-button";

export default function Form({ movie }: { movie: Movie }) {
  const action = EditMovie.bind(null, movie.id);

  return (
    <form className="flex flex-col rounded-lg p-4 m-4 gap-2" action={action}>
      <input
        defaultValue={movie.title}
        type="text"
        name="title"
        placeholder="Edit Title"
      />

      <input
        defaultValue={movie.release_date}
        type="text"
        name="releaseYear"
        placeholder="Edit Release Year"
      />

      <input
        defaultValue={movie.poster_path}
        type="text"
        name="posterPath"
        placeholder="Edit Poster Path"
      />

      {/* <input
      defaultValue={movie.genre}
      type="text"
      name="genre"
      placeholder="Edit Genre"
    /> */}

      <input
        defaultValue={movie.price}
        type="text"
        name="price"
        placeholder="Edit Price"
      />

      <EditButton />
    </form>
  );
}
