import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query usersQuery($restaurantSlug: string!) {
    users(restaurantSlug: $restaurantSlug)
      @rest(type: Menu, path: "restaurants/{args.restaurantSlug}/users/") {
      __typename
      id
      email
      first_name
      last_name
      role
      restaurant_id
    }
  }
`;

interface User {
  id: number;
  restaurant_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  __typename: string;
}

interface UsersData {
  users: User[];
}

interface Variables {
  restaurantSlug: string;
}

const useUsersQuery = (options?: QueryHookOptions<UsersData, Variables>) =>
  useQuery<UsersData, Variables>(USERS_QUERY, options);

export { useUsersQuery, USERS_QUERY };
export type { UsersData, User };
