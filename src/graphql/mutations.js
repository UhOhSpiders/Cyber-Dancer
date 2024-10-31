/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $input: CreateSongInput!
    $condition: ModelSongConditionInput
  ) {
    createSong(input: $input, condition: $condition) {
      id
      name
      blurb
      midiName
      mp3Name
      map
      thumbnail
      scores {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
      id
      name
      blurb
      midiName
      mp3Name
      map
      thumbnail
      scores {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
      id
      name
      blurb
      midiName
      mp3Name
      map
      thumbnail
      scores {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createScore = /* GraphQL */ `
  mutation CreateScore(
    $input: CreateScoreInput!
    $condition: ModelScoreConditionInput
  ) {
    createScore(input: $input, condition: $condition) {
      id
      user
      points
      songID
      song {
        id
        name
        blurb
        midiName
        mp3Name
        map
        thumbnail
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      songScoresId
      __typename
    }
  }
`;
export const updateScore = /* GraphQL */ `
  mutation UpdateScore(
    $input: UpdateScoreInput!
    $condition: ModelScoreConditionInput
  ) {
    updateScore(input: $input, condition: $condition) {
      id
      user
      points
      songID
      song {
        id
        name
        blurb
        midiName
        mp3Name
        map
        thumbnail
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      songScoresId
      __typename
    }
  }
`;
export const deleteScore = /* GraphQL */ `
  mutation DeleteScore(
    $input: DeleteScoreInput!
    $condition: ModelScoreConditionInput
  ) {
    deleteScore(input: $input, condition: $condition) {
      id
      user
      points
      songID
      song {
        id
        name
        blurb
        midiName
        mp3Name
        map
        thumbnail
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      songScoresId
      __typename
    }
  }
`;
