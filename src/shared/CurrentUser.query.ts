import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser @rest(type: User, path: "find_current_user") {
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

interface CurrentUserData {
  currentUser?: User;
}

const useCurrentUserQuery = (options?: QueryHookOptions<CurrentUserData>) =>
  useQuery<CurrentUserData>(CURRENT_USER_QUERY, options);

export { useCurrentUserQuery, CURRENT_USER_QUERY };
export type { CurrentUserData };
