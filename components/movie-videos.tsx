import { API_URL } from "@/app/constants";
import styles from "@/styles/movie-videos.module.css";

async function getVideos(id: number) {
  // console.log(`Fetching videos: ${Date.now()}`);
  // await new Promise((r) => setTimeout(r, 1000));
  // throw new Error("something broke...");
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id: number }) {
  const videos = await getVideos(id);
  return (
    <div className={styles.container}>
      {videos.map((video: { id: string; key: string; name: string }) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          title={video.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ))}
    </div>
  );
}
