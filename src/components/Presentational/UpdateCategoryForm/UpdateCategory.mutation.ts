import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($input: input) {
    updateCategory(input: $input)
      @rest(type: Category, path: "/menu_categories/{args.input.id}", method: "PATCH") {
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

interface UpdateCategoryData {
  __typename: string;
  updateCategory: Category;
}

const useUpdateCategoryMutation = (
  options?: MutationHookOptions<UpdateCategoryData, Variables>
) => {
  return useMutation<UpdateCategoryData, Variables>(UPDATE_CATEGORY_MUTATION, options);
};

export { useUpdateCategoryMutation };
