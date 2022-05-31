import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { ThemeFonts } from "@base";

const RESTAURANT_THEME_QUERY = gql`
  query RestaurantThemeQuery($restaurantSlug: string!) {
    restaurant(restaurantSlug: $restaurantSlug)
      @rest(type: Restaurant, path: "restaurants/{args.restaurantSlug}") {
      __typename
      id
      colour
      tint
      font
      background_colour
      background_tint
    }
  }
`;

interface Theme {
  __typename: string;
  id: number;
  colour: string;
  tint: number;
  font: ThemeFonts;
  background_colour: string;
  background_tint: number;
}

interface RestaurantThemeData {
  restaurant: Theme;
}

interface Variables {
  restaurantSlug: string;
}

const useRestaurantThemeQuery = (options?: QueryHookOptions<RestaurantThemeData, Variables>) =>
  useQuery<RestaurantThemeData, Variables>(RESTAURANT_THEME_QUERY, options);

export { useRestaurantThemeQuery, RESTAURANT_THEME_QUERY };
export type { RestaurantThemeData, Theme };
