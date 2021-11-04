import { QueryHookOptions, useQuery } from "@apollo/client";
import gql from "graphql-tag";

const ALLERGIES_QUERY = gql`
  query AllergiesQuery($restaurantSlug: Int!, $active: boolean) {
    allergies(restaurantSlug: $restaurantSlug, active: $active)
      @rest(
        type: Allergy
        path: "restaurants/{args.restaurantSlug}/dietaries?active={args.active}"
      ) {
      id
      name
      filter_name
      __typename
    }
  }
`;

interface Allergy {
  __typename: string;
  id: number;
  name: string;
  filter_name: string;
}

interface AllergyData {
  allergies: Allergy[];
}

interface Variables {
  restaurantSlug: string;
  active: boolean;
}

const useAllergiesQuery = (options?: QueryHookOptions<AllergyData, Variables>) =>
  useQuery<AllergyData, Variables>(ALLERGIES_QUERY, options);

export type { Allergy, AllergyData };
export { useAllergiesQuery, ALLERGIES_QUERY };
