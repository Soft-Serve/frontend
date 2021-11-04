import { ItemSize } from "@shared";
import gql from "graphql-tag";
import { MutationHookOptions, useMutation } from "@apollo/client";

const UPDATE_ITEM_SIZES_MUTATION = gql`
  mutation UpdateItemSizes($itemID: Int!, $input: input) {
    itemSizes(itemID: $itemID, input: $input)
      @rest(type: ItemSize, path: "menu_items/{args.itemID}/item_sizes/", method: "PATCH") {
      id
      price
      unit
      menu_item_id
      __typename
    }
  }
`;

interface ItemSizesData {
  __typename: string;
  itemSizes?: ItemSize[];
}

interface Variables {
  itemID?: number;
  input?: ItemSize[];
}

const useUpdateItemSizesMutation = (options?: MutationHookOptions<ItemSizesData, Variables>) =>
  useMutation<ItemSizesData, Variables>(UPDATE_ITEM_SIZES_MUTATION, options);

export { useUpdateItemSizesMutation, UPDATE_ITEM_SIZES_MUTATION };
export type { ItemSizesData };
