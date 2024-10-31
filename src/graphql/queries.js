/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
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
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getScore = /* GraphQL */ `
  query GetScore($id: ID!) {
    getScore(id: $id) {
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
export const listScores = /* GraphQL */ `
  query ListScores(
    $filter: ModelScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        points
        songID
        createdAt
        updatedAt
        songScoresId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const bySongAndPoints = /* GraphQL */ `
  query BySongAndPoints(
    $songID: ID!
    $points: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bySongAndPoints(
      songID: $songID
      points: $points
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user
        points
        songID
        createdAt
        updatedAt
        songScoresId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
