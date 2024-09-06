import Image from "next/image"
import { Button } from "./button"

export function Banner() {
	return (
		<section className="banner-section relative w-full h-[100vh] bg-black">
			<div className="banner"/>
				<Image src="/movie-poster-banner.jpg" alt="Movie Banner" className="absolute inset-0 object-cover w-full h-[100vh]" 
					width={1920} height={1080} priority/>
			<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
				<h1 className="text-5xl font-bold">The Dark Knight Trilogy</h1>
				<p className="mt-4 text-lg">Experience the epic saga of Batman acclaimed trilogy.</p>
				<div className="mt-8 space-x-4">
					<Button className="btn">Buy Now</Button>
					<Button className="secondary">Learn More</Button>
				</div>
			</div>
		</section>
	)
}
