"use client";


import { useState } from "react";
import AddButton from "./add-button";
import { FailureResult } from "../../app/actions/validation-schema";
import { useRouter } from "next/navigation";
import AddMovie from "../../app/actions/add";


export default function FormComponent() {
  const [errors, setErrors] = useState<FailureResult["errors"]>();
  const router = useRouter();
  async function action(formData: FormData) {
    const errors = await AddMovie(formData);
    setErrors(errors?.errors);
    if (!errors) {
      router.push("/moviesdb-page");
    }

    console.log(errors);
  }
  return (
    
    <form
      className="flex flex-col space-y-4 max-w-md w-full mx-auto bg-slate-200 rounded-lg p-4"
      action={action}
    >
      {/* <label htmlFor="Title"></label> */}
      <input
      
        className="border border-black rounded mx-3 p-2 text-sm"
        type="text"
        name="title"
        placeholder="Title"
      />
      {errors?.title && (
        <p className="text-red-500">{errors.title._errors.join(" ")}</p>
      )}

      {/* <label htmlFor="Release Year"></label> */}
      <input
        className="border border-black rounded mx-3 p-2 text-sm"
        type="text"
        name="releaseYear"
        placeholder="Release Year"
      />
      {errors?.releaseYear && (
        <p className="text-red-500">{errors.releaseYear._errors.join(" ")}</p>
      )}

      {/* <label htmlFor="Add Image"></label> */}
      <input
        className="border border-black rounded mx-3 p-2 text-sm"
        type="text"
        name="posterPath"
        placeholder="Add Image"
      />
      {errors?.posterPath && (
        <p className="text-red-500">{errors.posterPath._errors.join(" ")}</p>
      )}

      {/* <label htmlFor="Genre"></label> */}
      <input
        className="border border-black rounded mx-3 p-2 text-sm"
        type="text"
        name="genre"
        placeholder="Genre"
      />
      {errors?.genre && (
        <p className="text-red-500">{errors.genre._errors.join(" ")}</p>
      )}

      {/* <label htmlFor="Price"></label> */}
      <input
        className="border border-black rounded mx-3 p-2 text-sm"
        type="text"
        name="price"
        placeholder="Price"
      />
      {errors?.price && (
        <p className="text-red-500">{errors.price._errors.join(" ")}</p>
      )}
      <AddButton />
    </form>
  );
}
