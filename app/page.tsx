"use client";

import Form from "../components/ui/form";

const fetchAndStoreMovies = async () => {
  try {
    const response = await fetch("/api/movies-api");

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error("Error fetching and storing movies:", error);
  }
};

const Page = () => {
  return (
    <>
      <div>
        <h1>Movie Data</h1>
        <button onClick={fetchAndStoreMovies}>Fetch and Store Movies</button>
      </div>
      <Form />
    </>
  );
};

export default Page;

