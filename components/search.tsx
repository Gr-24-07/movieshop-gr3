'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


import Moviecard from './ui/MovieCard';

export function SearchBar() {
  

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="relative w-full max-w-md">
      <Input className="w-full rounded-md border border-neutral-300 px-4 py-2 pr-10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
        name="search"
        id="search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
        
      />
      <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 text-neutral-500">
        <SearchIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
