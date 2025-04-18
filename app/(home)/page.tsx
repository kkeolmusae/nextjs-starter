import Movie from "@/components/movie";
import { IMovieProps } from "@/components/movie.interface";
import { Metadata } from "next";
import styles from "@/styles/home.module.css";
import { API_URL } from "../constants";

export const metadata: Metadata = {
  title: "Home",
};

async function getMovies() {
  // await new Promise((r) => setTimeout(r, 1000));
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {movies.map((movie: IMovieProps) => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
  );
}
