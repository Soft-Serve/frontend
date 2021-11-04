import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItem($input: input) {
    deleteItem(input: $input)
      @rest(type: Item, path: "menu_items/{args.input.id}", method: "DELETE") {
      id
      name
      description
      available
      menu_category_id
      __typename
    }
  }
`;
interface Item {
  id: number;
  available: boolean;
  name: string;
  description: string;
  menu_category_id: number;
  __typename: string;
}

interface Variables {
  input: Item;
}

interface DeleteItemData {
  __typename: string;
  deleteItem: Item;
}

const useDeleteItemMutation = (options?: MutationHookOptions<DeleteItemData, Variables>) =>
  useMutation<DeleteItemData, Variables>(DELETE_ITEM_MUTATION, options);

export { useDeleteItemMutation };
