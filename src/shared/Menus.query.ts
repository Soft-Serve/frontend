import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const MENUS_QUERY = gql`
  query MenusQuery($restaurantSlug: string!) {
    menus(restaurantSlug: $restaurantSlug)
      @rest(type: Menu, path: "restaurants/{args.restaurantSlug}/menus/") {
      __typename
      name
      id
      restaurant_id
    }
  }
`;

interface Menu {
  __typename: string;
  name: string;
  id: number;
  restaurant_id?: number;
}

interface MenusData {
  menus: Menu[];
}

interface Variables {
  restaurantSlug: string;
}

const useMenusQuery = (options?: QueryHookOptions<MenusData, Variables>) =>
  useQuery<MenusData, Variables>(MENUS_QUERY, options);

export { useMenusQuery, MENUS_QUERY };
export type { MenusData, Menu };
