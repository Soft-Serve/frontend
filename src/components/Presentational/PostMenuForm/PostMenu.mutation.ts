import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const POST_MENU_MUTATION = gql`
  mutation PostMenu($input: input) {
    postMenu(input: $input) @rest(type: Menu, path: "/menus", method: "POST") {
      id
      name
      restaurant_id
      __typename
    }
  }
`;

interface Menu {
  id: number;
  name: string;
  restaurant_id: number;
  __typename: string;
}

interface PostMenuData {
  __typename: string;
  postMenu: Menu;
}

interface Variables {
  input: Menu;
}

const usePostMenuMutation = (options?: MutationHookOptions<PostMenuData, Variables>) =>
  useMutation<PostMenuData, Variables>(POST_MENU_MUTATION, options);

export { usePostMenuMutation };
