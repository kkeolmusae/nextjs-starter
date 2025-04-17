"use client";

import Link from "next/link";
import { IMovieProps } from "./movie.interface";
import styles from "@/styles/movie.module.css";
import { useRouter } from "next/navigation";

export default function Movie(movie: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div className={styles.movie} key={movie.id}>
      <img src={movie.poster_path} alt={movie.title} onClick={onClick} />
      <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
    </div>
  );
}
