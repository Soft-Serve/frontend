import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_CURRENT_USER = gql`
  mutation UpdateCurrentUser($input: input) {
    updateCurrentUser(input: $input)
      @rest(type: Item, path: "users/{args.input.id}", method: "PATCH") {
      id
      first_name
      last_name
    }
  }
`;

interface CurrentUser {
  id: number;
  first_name: string;
  last_name: string;
}

interface Variables {
  input: CurrentUser;
}

interface UpdateCurrentUserData {
  __typename: string;
  updatedUser: CurrentUser;
}

const useUpdateCurrentUser = (options?: MutationHookOptions<UpdateCurrentUserData, Variables>) =>
  useMutation<UpdateCurrentUserData, Variables>(UPDATE_CURRENT_USER, options);

export { useUpdateCurrentUser };
