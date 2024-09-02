import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Form from "./form";

async function EditMovie({ params }: { params: { id: string } }) {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!movie) {
    return notFound();
  }

  return (
    <div>
      <h1>Edit Page</h1>
      <Form movie={movie} />
    </div>
  );
}
export default EditMovie;
