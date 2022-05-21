import { ItemSize } from "@shared";
import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const ITEM_SIZES_QUERY = gql`
  query ItemSizesQuery($itemID: Int!) {
    itemSizes(itemID: $itemID) @rest(type: ItemSize, path: "menu_items/{args.itemID}/item_sizes") {
      id
      price
      unit
      promo_price
      menu_item_id
      __typename
    }
  }
`;

interface ItemSizeData {
  itemSizes: ItemSize[];
}

interface Variables {
  itemID: number;
}

const useItemSizeQuery = (options?: QueryHookOptions<ItemSizeData, Variables>) =>
  useQuery<ItemSizeData, Variables>(ITEM_SIZES_QUERY, options);

export { useItemSizeQuery, ITEM_SIZES_QUERY };
export type { ItemSizeData };
