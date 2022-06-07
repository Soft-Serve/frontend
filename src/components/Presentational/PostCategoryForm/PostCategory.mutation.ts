import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

const POST_CATEGORY_MUTATION = gql`
  mutation PostCategory($input: input) {
    postCategory(input: $input) @rest(type: Category, path: "/menu_categories", method: "POST") {
      id
      name
      menu_id
      has_active_promo
      category_type
      __typename
    }
  }
`;

interface Category {
  id: number;
  name: string;
  has_active_promo: boolean;
  category_type: string;
  menu_id: number;
  __typename: string;
}

interface CategoriesData {
  categories: Category[];
}

interface PostCategoryMutationData {
  __typename: string;
  postCategory: Category;
}

interface Variables {
  input: Category;
}

const usePostCategoryMutation = (
  options?: MutationHookOptions<PostCategoryMutationData, Variables>
) => useMutation<PostCategoryMutationData, Variables>(POST_CATEGORY_MUTATION, options);

export { usePostCategoryMutation, POST_CATEGORY_MUTATION };
export type { CategoriesData };
