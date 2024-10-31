/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong($filter: ModelSubscriptionSongFilterInput) {
    onCreateSong(filter: $filter) {
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
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong($filter: ModelSubscriptionSongFilterInput) {
    onUpdateSong(filter: $filter) {
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
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong($filter: ModelSubscriptionSongFilterInput) {
    onDeleteSong(filter: $filter) {
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
export const onCreateScore = /* GraphQL */ `
  subscription OnCreateScore($filter: ModelSubscriptionScoreFilterInput) {
    onCreateScore(filter: $filter) {
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
export const onUpdateScore = /* GraphQL */ `
  subscription OnUpdateScore($filter: ModelSubscriptionScoreFilterInput) {
    onUpdateScore(filter: $filter) {
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
export const onDeleteScore = /* GraphQL */ `
  subscription OnDeleteScore($filter: ModelSubscriptionScoreFilterInput) {
    onDeleteScore(filter: $filter) {
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
