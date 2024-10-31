import client from "./client";
import { createSong } from "../../graphql/mutations";

export default async function addSongs() {
  try {
    const result = await client.graphql({
      query: createSong,
      variables: {
        input: {
          map: "psych_test",
          midiName: "midi-to-click-test.MID",
          mp3Name: "midi-to-click-test.mp3",
          name: "test track",
          thumbnail: "test-thumbnail.jpeg",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
