import { createScore } from "../../graphql/mutations";
import client from "./client";

export default async function addScoreToSong(payload) {
  try {
    const result = await client.graphql({
      query: createScore,
      variables: {
        input: {
          user: payload.user,
          points: payload.points,
          songID: payload.songID,
        },
      },
    });
  } catch (error) {
    console.error("Error creating score:", error);
  }
}
