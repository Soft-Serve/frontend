import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const DELETE_ALLERGY_MUTATION = gql`
  mutation DeleteAllergy($input: input) {
    deleteAllergy(input: $input)
      @rest(type: Allergy, path: "/dietaries/{args.input.id}", method: "DELETE") {
      id
      name
      filter_name
    }
  }
`;

interface Allergy {
  id: number;
  name: string;
  filter_name: string;
  __typename: string;
}

interface Variables {
  input: Allergy;
}

interface DeleteAllergyData {
  __typename: string;
  deleteAllergy: Allergy;
}

const useDeleteAllergyMutation = (options?: MutationHookOptions<DeleteAllergyData, Variables>) => {
  return useMutation<DeleteAllergyData, Variables>(DELETE_ALLERGY_MUTATION, options);
};

export type { DeleteAllergyData };
export { useDeleteAllergyMutation };
