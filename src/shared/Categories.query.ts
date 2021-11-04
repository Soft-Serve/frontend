import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const CATEGORIES_QUERY = gql`
  query CategoriesQuery($menuID: Int!) {
    categories(menuID: $menuID) @rest(type: Category, path: "menus/{args.menuID}/menu_categories") {
      id
      name
      menu_id
      category_type
      __typename
    }
  }
`;

interface Category {
  id: number;
  name: string;
  category_type: string;
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
  useQuery<CategoriesData, Variables>(CATEGORIES_QUERY, options);

export { useCategoriesQuery, CATEGORIES_QUERY };
export type { CategoriesData, Category };
