
import { Banner } from '@/components/ui/banner';
import RecentMovies from '@/components/ui/LastestMovies';
import TopFiveOldestMovies from '@/components/ui/OldestMovies';


export  default function Home() {
    return (
        <>
            <div>
                <Banner />
            </div>
            <main className="container mx-auto min-h-screen">
                <RecentMovies />  
                <hr className='m-8'/>
                <TopFiveOldestMovies />
            
            </main>
        </>
    )
}






























// "use client";

// import Form from "../components/ui/form";

// const fetchAndStoreMovies = async () => {
//   try {
//     const response = await fetch("/api/movies-api");

//     const result = await response.json();
//     console.log(result.message);
//   } catch (error) {
//     console.error("Error fetching and storing movies:", error);
//   }
// };

// const Page = () => {
//   return (
//     <>
//       <div>
//         <h1>Movie Data</h1>
//         <button onClick={fetchAndStoreMovies}>Fetch and Store Movies</button>
//       </div>
//       <Form />
//     </>
//   );
// };

// export default Page;

