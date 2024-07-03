import { graphql } from "../../gql";

export const getAllTweetQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      id
      content
      contentImage
      author {
        id
        firstName
        lastName
        avatarUrl
      }
    }
  }
`);
