import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_ONBOARDING = gql`
  mutation UpdateRestaurantOnboarding($input: input) {
    updatedRestaurant(input: $input)
      @rest(type: Item, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      onboarding_done
    }
  }
`;

interface Restaurant {
  __typename: string;
  id: string;
  onboarding_done: boolean;
}

interface Variables {
  input: {
    onboarding_done: boolean;
    id: string;
  };
}

interface UpdateRestaurantData {
  __typename: string;
  updatedRestaurant: Restaurant;
}

const useUpdateRestaurantOnboarding = (
  options?: MutationHookOptions<UpdateRestaurantData, Variables>
) => useMutation<UpdateRestaurantData, Variables>(UPDATE_RESTAURANT_ONBOARDING, options);

export { useUpdateRestaurantOnboarding };
export type { Restaurant };
