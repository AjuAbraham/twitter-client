import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphQlClient } from "../constants/api";
import { getAllTweetQuery } from "../graphql/query/tweet";
import { createTweetMutation } from "../graphql/mutation/tweet";
import { CreateTweetData } from "../gql/graphql";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphQlClient.request(createTweetMutation, { payload }),
    onMutate: () => toast.loading("Creating Tweet", { id: "1" }),
    onSuccess: async() => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Created Successfully",{id:"1"})
    },
  });
  return mutation;
};

export const useGetAllTweet = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphQlClient.request(getAllTweetQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};
