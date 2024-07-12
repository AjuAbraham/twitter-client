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

export const getSignedUrlForTweetQuery = graphql(`
  query preSignedUrl($imageType: String!, $imageName: String!, $size: Int!) {
    getSignedUrlForTweet(
      imageType: $imageType
      imageName: $imageName
      size: $size
    )
  }
`);
