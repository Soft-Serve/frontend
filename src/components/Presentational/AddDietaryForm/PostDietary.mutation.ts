import { MutationHookOptions, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const POST_DIETARY_MUTATION = gql`
  mutation PostDietary($input: input) {
    dietary(input: $input)
      @rest(
        type: Allergy
        path: "menu_items/{args.input.menu_id}/dietary_instances/"
        method: "POST"
      ) {
      id
      name
      filter_name
      __typename
      menu_item_id
      dietary_id
    }
  }
`;

interface Dietary {
  __typename: string;
  id: number;
  name: string;
  filter_name: string;
  menu_item_id: number;
  dietary_id: number;
}

interface PostDietaryData {
  dietary: Dietary;
}

interface Variables {
  input: {
    menu_id: number;
    dietary_id: number;
  };
}

const usePostDietaryMutation = (options?: MutationHookOptions<PostDietaryData, Variables>) =>
  useMutation<PostDietaryData, Variables>(POST_DIETARY_MUTATION, options);

export type { Dietary, PostDietaryData };
export { usePostDietaryMutation, POST_DIETARY_MUTATION };
