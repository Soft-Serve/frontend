import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const DELETE_MENU_MUTATION = gql`
  mutation DeleteMenu($input: input) {
    deleteMenu(input: $input) @rest(type: Menu, path: "menus/{args.input.id}", method: "DELETE") {
      id
      name
      restaurant_id
      __typename
    }
  }
`;

interface Menu {
  id?: number;
  name?: string;
  restaurant_id?: number;
  __typename?: string;
}

interface DeleteMenuData {
  __typename: string;
  deleteMenu: Menu;
}

interface Variables {
  input: Menu;
}

const useDeleteMenuMutation = (options?: MutationHookOptions<DeleteMenuData, Variables>) =>
  useMutation<DeleteMenuData, Variables>(DELETE_MENU_MUTATION, options);

export { useDeleteMenuMutation };
