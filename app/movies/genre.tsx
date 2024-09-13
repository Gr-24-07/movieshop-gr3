'use client';
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
}
 
interface GenrePageProps {
  genres: Genre[];
}
 
const GenresPage = async ({ genres}: GenrePageProps) => {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Genre" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
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