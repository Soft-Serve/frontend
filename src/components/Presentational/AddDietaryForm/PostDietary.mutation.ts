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
    }
  }
`;

interface Dietary {
  id: number;
}

interface DietaryData {
  dietary: Dietary;
}

interface Variables {
  input: {
    menu_id: number;
    dietary_id: number;
  };
}

const usePostDietaryMutation = (options?: MutationHookOptions<DietaryData, Variables>) =>
  useMutation<DietaryData, Variables>(POST_DIETARY_MUTATION, options);

export type { Dietary, DietaryData };
export { usePostDietaryMutation, POST_DIETARY_MUTATION };
