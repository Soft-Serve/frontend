import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

const POST_ALLERGY_MUTATION = gql`
  mutation PostAllergy($input: input) {
    postAllergy(input: $input) @rest(type: Allergy, path: "dietaries", method: "POST") {
      id
      name
      filter_name
      restaurant_id
    }
  }
`;

interface Allergy {
  name: string;
  filter_name: string;
  restaurant_id?: number;
  __typename: string;
}

interface AllergiesData {
  allergies: Allergy[];
}

interface PostAllergyMutationData {
  __typename: string;
  postAllergy: Allergy;
}

interface Variables {
  input: Allergy;
}

const usePostAllergyMutation = (
  options?: MutationHookOptions<PostAllergyMutationData, Variables>
) => useMutation<PostAllergyMutationData, Variables>(POST_ALLERGY_MUTATION, options);

export { usePostAllergyMutation, POST_ALLERGY_MUTATION };
export type { AllergiesData };
