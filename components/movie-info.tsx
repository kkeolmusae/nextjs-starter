import { API_URL } from "@/app/(home)/page";

async function getMovie(id: number) {
  // console.log(`Fetching movies: ${Date.now()}`);
  // await new Promise((r) => setTimeout(r, 3000));
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function MovieInfo({ id }: { id: number }) {
  const movie = await getMovie(id);
  return <h6>{JSON.stringify(movie)}</h6>;
}
