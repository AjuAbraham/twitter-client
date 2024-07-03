import { graphql } from "../../gql";

export const createTweetMutation = graphql(`
  #graphql
  mutation createTweet($payload:createTweetData!){
    createTweet(payload: $payload){
        id
    }
  }
`);
