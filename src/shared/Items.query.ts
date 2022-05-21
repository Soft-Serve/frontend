import { useQuery } from "@apollo/client";
import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";

export const ITEMS_QUERY = gql`
  query ItemsQuery($categoryID: Int!) {
    items(categoryID: $categoryID)
      @rest(type: Item, path: "menu_categories/{args.categoryID}/menu_items") {
      id
      name
      description
      photo
      menu_category_id
      sizes
      available
    }
  }
`;

interface ItemSize {
  id?: any;
  price: string;
  promo_price?: string;
  unit: string;
  menu_item_id: number;
  __typename: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
  photo: string;
  menu_category_id: number;
  available: boolean;
  sizes: ItemSize[];
  __typename: string;
}

interface ItemsData {
  items: Item[];
}

interface Variables {
  categoryID: number;
}

const useItemsQuery = (options?: QueryHookOptions<ItemsData, Variables>) =>
  useQuery<ItemsData, Variables>(ITEMS_QUERY, options);

export { useItemsQuery };
export type { ItemsData, ItemSize, Item };
