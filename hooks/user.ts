import { useQuery } from "@tanstack/react-query";
import { graphQlClient } from "../constants/api";
import { getCurrentUserQuery, getUserByIdQuery } from "../graphql/query/user";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphQlClient.request(getCurrentUserQuery),
  });
  return { ...query, user: query.data?.getCurrentUser };
};

export const useGetUserById = (id: string) => {
  const query = useQuery({
    queryKey: ["get-user"],
    queryFn: () => graphQlClient.request(getUserByIdQuery, {id:id }),
    refetchOnWindowFocus:false,
    refetchOnReconnect:false,
    retry:false
  });
  return { ...query, user: query.data?.getUserById };
};
