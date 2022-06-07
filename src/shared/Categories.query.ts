import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

export enum CategoryTypes {
  food = "food",
  beverage = "beverage",
}

const CATEGORIES_QUERY = gql`
  query CategoriesQuery($menuID: Int!) {
    categories(menuID: $menuID) @rest(type: Category, path: "menus/{args.menuID}/menu_categories") {
      id
      has_active_promo
      name
      menu_id
      category_type
      __typename
    }
  }
`;

type CategoryType = keyof typeof CategoryTypes;

interface Category {
  has_active_promo: boolean;
  id: number;
  name: string;
  category_type: CategoryType;
  menu_id: number;
  __typename: string;
}

interface CategoriesData {
  categories: Category[];
}

interface Variables {
  menuID: number;
}

const useCategoriesQuery = (options?: QueryHookOptions<CategoriesData, Variables>) =>
  useQuery<CategoriesData, Variables>(CATEGORIES_QUERY, {
    fetchPolicy: "cache-and-network",
    ...options,
  });

export { useCategoriesQuery, CATEGORIES_QUERY };
export type { CategoriesData, Category, CategoryType };
