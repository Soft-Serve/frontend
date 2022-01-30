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
      menu_item_id
      dietary_id
    }
  }
`;

interface Allergy {
  __typename: string;
  id: number;
  name: string;
  filter_name: string;
  menu_item_id: number;
  dietary_id: number;
}

interface AllergiesData {
  allergies: Allergy[];
}

interface Variables {
  restaurantSlug: string;
  active: boolean;
}

const useAllergiesQuery = (options?: QueryHookOptions<AllergiesData, Variables>) =>
  useQuery<AllergiesData, Variables>(ALLERGIES_QUERY, options);

export type { Allergy, AllergiesData };
export { useAllergiesQuery, ALLERGIES_QUERY };
