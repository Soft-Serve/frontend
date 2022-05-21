import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const PROMOTIONS_QUERY = gql`
  query PromotionsQuery($restaurantSlug: string!) {
    promotions(restaurantSlug: $restaurantSlug)
      @rest(type: Promotions, path: "restaurants/{args.restaurantSlug}/promotions/") {
      id
      name
      description
      start_time
      end_time
      days
      restaurant_id
      __typename
    }
  }
`;

interface Promotion {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  days: string;
  restaurant_id: number;
  __typename: string;
}

interface PromotionsData {
  promotions: Promotion[];
}

interface Variables {
  restaurantSlug: string;
}

const usePromotionsQuery = (options?: QueryHookOptions<PromotionsData, Variables>) =>
  useQuery<PromotionsData, Variables>(PROMOTIONS_QUERY, options);

export { usePromotionsQuery, PROMOTIONS_QUERY };
export type { PromotionsData, Promotion };
