import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_ALLERGY_MUTATION = gql`
  mutation UpdateAllergy($input: input) {
    updateAllergy(input: $input)
      @rest(type: Allergy, path: "/dietaries/{args.input.id}", method: "PATCH") {
      id
      name
      filter_name
      __typename
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

interface UpdateAllergyData {
  __typename: string;
  updateAllergy: Allergy;
}

const useUpdateAllergyMutation = (options?: MutationHookOptions<UpdateAllergyData, Variables>) => {
  return useMutation<UpdateAllergyData, Variables>(UPDATE_ALLERGY_MUTATION, options);
};

export { useUpdateAllergyMutation };
