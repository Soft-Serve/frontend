import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const RESTAURANT_QUERY = gql`
  query RestaurantQuery($restaurantSlug: string!) {
    restaurant(restaurantSlug: $restaurantSlug)
      @rest(type: Restaurant, path: "restaurants/{args.restaurantSlug}") {
      __typename
      id
      name
      currency
      colour
      tint
      font
      logo
      slug
      address_line_1
      address_line_2
      city
      province
      postal_code
      country
      update
      has_items
      has_styles
      onboarding_done
    }
  }
`;

interface Restaurant {
  __typename: string;
  id: number;
  name: string;
  currency: string;
  colour: string;
  tint: number;
  font: string;
  logo: string;
  slug: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  has_items: boolean;
  has_styles: boolean;
  onboarding_done: boolean;
}

interface RestaurantData {
  restaurant: Restaurant;
}

interface Variables {
  restaurantSlug: string;
}

const useRestaurantQuery = (options?: QueryHookOptions<RestaurantData, Variables>) =>
  useQuery<RestaurantData, Variables>(RESTAURANT_QUERY, options);

export { useRestaurantQuery, RESTAURANT_QUERY };
