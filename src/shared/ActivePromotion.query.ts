import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const ACTIVE_PROMOTION_QUERY = gql`
  query ActivePromotionQuery($restaurantSlug: string!) {
    activePromotion(restaurantSlug: $restaurantSlug)
      @rest(type: Promotions, path: "restaurants/{args.restaurantSlug}/active_promotion") {
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

interface ActivePromotionData {
  activePromotion: Promotion;
}

interface Variables {
  restaurantSlug: string;
}

const useActivePromotionsQuery = (options?: QueryHookOptions<ActivePromotionData, Variables>) =>
  useQuery<ActivePromotionData, Variables>(ACTIVE_PROMOTION_QUERY, {
    fetchPolicy: "network-only",
    ...options,
  });

export { useActivePromotionsQuery, ACTIVE_PROMOTION_QUERY };
export type { ActivePromotionData, Promotion };
