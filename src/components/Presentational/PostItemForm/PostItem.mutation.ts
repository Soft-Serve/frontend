import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const POST_ITEM_MUTATION = gql`
  mutation PostItem($input: input) {
    postItem(input: $input) @rest(type: Item, path: "/menu_items", method: "POST") {
      id
      name
      description
      photo
      menu_category_id
      sizes
      available
      __typename
    }
  }
`;

interface ItemSize {
  id?: string;
  price: string;
  unit: string;
  menu_item_id: number;
  __typename: string;
}

interface Item {
  id: number;
  name: string;
  available: boolean;
  description: string;
  photo: string;
  menu_category_id: number;
  sizes: ItemSize[];
  __typename: string;
}

interface Variables {
  input: Item;
}

interface PostItemData {
  __typename: string;
  postItem: Item;
}

const usePostItemMutation = (options?: MutationHookOptions<PostItemData, Variables>) =>
  useMutation<PostItemData, Variables>(POST_ITEM_MUTATION, options);

export { usePostItemMutation };
