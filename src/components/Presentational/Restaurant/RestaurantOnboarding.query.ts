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
    }
  }
`;

interface Restaurant {
  id: number;
  has_items: boolean;
  has_styles: boolean;
  onboarding_done: boolean;
}

interface RestaurantOnBoardingData {
  restaurant: Restaurant;
}

interface Variables {
  restaurantSlug: string;
}

const useRestaurantOnboardingQuery = (
  options?: QueryHookOptions<RestaurantOnBoardingData, Variables>
) => useQuery<RestaurantOnBoardingData, Variables>(RESTAURANT_ONBOARDING_QUERY, options);

export { useRestaurantOnboardingQuery, RESTAURANT_ONBOARDING_QUERY };
