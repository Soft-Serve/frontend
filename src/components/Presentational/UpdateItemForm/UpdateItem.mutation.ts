import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ItemSize } from "src/shared";

export const UPDATE_ITEM_MUTATIOM = gql`
  mutation UpdateItem($input: input) {
    updateItem(input: $input)
      @rest(type: Item, path: "menu_items/{args.input.id}", method: "PATCH") {
      id
      name
      description
      sizes
      available
      menu_category_id
      __typename
    }
  }
`;

interface Item {
  id: number;
  name: string;
  available: boolean;
  description: string;
  sizes: ItemSize[];
  menu_category_id: number;
  __typename: string;
}

interface Variables {
  input: Item;
}

interface UpdateItemData {
  __typename: string;
  updateItem: Item;
}

const useUpdateItemMutation = (options?: MutationHookOptions<UpdateItemData, Variables>) =>
  useMutation<UpdateItemData, Variables>(UPDATE_ITEM_MUTATIOM, options);

export { useUpdateItemMutation };
