'use sever';
import { MovieGenre } from "@prisma/client";
import prisma from "@/lib/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 
interface Genre {
  id: number;
  name: string;
  movies: MovieGenre[]; // added from prisma
}
 
interface Props {
  genres: Genre[];
}
 
const GenresPage = async () => {
  const genreList = await prisma.genre.findMany({
  });
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          {genreList.map((genre) => (
            <SelectItem value={genre.name} key={genre.id}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
 
      {/* Add forms for creating/updating/deleting genres */}
    </div>
  );
};
 
export default GenresPage;