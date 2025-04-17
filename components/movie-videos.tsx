import { API_URL } from "@/app/(home)/page";

async function getVideos(id: number) {
  console.log(`Fetching videos: ${Date.now()}`);
  await new Promise((r) => setTimeout(r, 1000));
  // throw new Error("something broke...");
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id: number }) {
  const videos = await getVideos(id);
  return <h6>{JSON.stringify(videos)}</h6>;
}
