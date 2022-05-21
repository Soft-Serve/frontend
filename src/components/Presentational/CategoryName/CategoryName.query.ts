import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const CATEGORY_NAME_QUERY = gql`
  query CategoryNameQuery($categoryID: Int!) {
    categoryName(categoryID: $categoryID)
      @rest(type: Category, path: "menu_categories/{args.categoryID}") {
      id
      name
    }
  }
`;

interface CategoryName {
  id: number;
  name: string;
}

interface CategoryNameData {
  categoryName: CategoryName;
}

interface Variables {
  categoryID: number;
}

const useCategoryNameQuery = (options?: QueryHookOptions<CategoryNameData, Variables>) =>
  useQuery<CategoryNameData, Variables>(CATEGORY_NAME_QUERY, options);

export { useCategoryNameQuery, CATEGORY_NAME_QUERY };
export type { CategoryName };
