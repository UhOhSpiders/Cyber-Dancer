import client from "./client";
import { listScores, bySongAndPoints } from "../../graphql/queries";
import { createSong } from "../../graphql/mutations";
import addScoreToSong from "./addScore";

export default async function fetchScores(songID) {
  try {
    const songData = await client.graphql({
      query: bySongAndPoints,
      variables: {
        songID: songID,
        sortDirection: "DESC",
        limit: 10,
      },
    });
    return songData.data.bySongAndPoints.items;
  } catch (error) {
    console.log(error);
  }
}
