import { MutationHookOptions, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_DIETARY_MUTATION = gql`
  mutation DeleteDietary($input: input) {
    dietary(input: $input)
      @rest(
        type: Allergy
        path: "/menu_items/{args.input.menu_item_id}/dietary_instances/{args.input.dietary.id}"
        method: "DELETE"
      ) {
      id
      name
      menu_item_id
      dietary_id
    }
  }
`;

interface Dietary {
  id: number;
  name: string;
  menu_item_id: number;
  dietary_id: number;
}
interface DeleteDietaryData {
  __typename: string;
  dietary: Dietary;
}

interface Variables {
  input: {
    menu_item_id: number;
    dietary?: Dietary;
  };
}

const useDeleteDietaryMutation = (options?: MutationHookOptions<DeleteDietaryData, Variables>) =>
  useMutation<DeleteDietaryData, Variables>(DELETE_DIETARY_MUTATION, options);

export type { Dietary, DeleteDietaryData };
export { useDeleteDietaryMutation, DELETE_DIETARY_MUTATION };
