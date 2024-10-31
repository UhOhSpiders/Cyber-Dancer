import { listSongs } from "../../graphql/queries";
import client from "./client";

export default async function fetchSongs() {
  try {
    const songData = await client.graphql({
      query: listSongs
    });
    return songData.data.listSongs.items;
  } catch (error) {
    console.log(error);
    throw error
  }
}
