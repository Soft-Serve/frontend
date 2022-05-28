import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const RESTAURANT_ONBOARDING_QUERY = gql`
  query RestaurantOnBoardingQuery($restaurantSlug: string!) {
    restaurant(restaurantSlug: $restaurantSlug)
      @rest(type: Restaurant, path: "restaurants/{args.restaurantSlug}") {
      __typename
      id
      has_items
      has_styles
      onboarding_done
      name
    }
  }
`;

interface Onboarding {
  id: number;
  has_items: boolean;
  has_styles: boolean;
  onboarding_done: boolean;
  name: string;
}

interface RestaurantOnBoardingData {
  restaurant: Onboarding;
}

interface Variables {
  restaurantSlug: string;
}

const useRestaurantOnboardingQuery = (
  options?: QueryHookOptions<RestaurantOnBoardingData, Variables>
) => useQuery<RestaurantOnBoardingData, Variables>(RESTAURANT_ONBOARDING_QUERY, options);

export { useRestaurantOnboardingQuery, RESTAURANT_ONBOARDING_QUERY };
export type { RestaurantOnBoardingData, Onboarding };
