import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($input: input) {
    deleteCategory(input: $input)
      @rest(type: Category, path: "/menu_categories/{args.input.id}", method: "DELETE") {
      id
      name
      category_type
      menu_id
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

interface Variables {
  input: Category;
}

interface DeleteCategoryData {
  __typename: string;
  deleteCategory: Category;
}

const useDeleteCategoryMutation = (
  options?: MutationHookOptions<DeleteCategoryData, Variables>
) => {
  return useMutation<DeleteCategoryData, Variables>(DELETE_CATEGORY_MUTATION, options);
};

export { useDeleteCategoryMutation };
