import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      id
      avatarUrl
      email
      firstName
      lastName
      tweets {
        id
        content
        author {
          id
          firstName
          lastName
          avatarUrl
        }
      }
    }
  }
`);

export const getUserByIdQuery = graphql(`
  #graphql
  query GetUserById($id: String) {
  getUserById(id: $id) {
    firstName
    lastName
    avatarUrl
    tweets {
      id
      content
      contentImage
      author {
        id
        avatarUrl
        firstName
        lastName
      }
    }
  }
}
`);
