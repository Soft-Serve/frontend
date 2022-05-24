import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const PROMOTIONS_CATEGORIES_QUERY = gql`
  query PromotionCategoriesQuery($promotionID: string!) {
    promotionCategories(promotionID: $promotionID)
      @rest(type: PromotionCategories, path: "promotions/{args.promotionID}/promotion_categories") {
      id
      discount
      unit
      promotion_id
      menu_category_id
      __typename
    }
  }
`;

interface PromotionCategory {
  id: number;
  discount: number;
  unit: string;
  promotion_id: number;
  menu_category_id: number;
  __typename: string;
}

interface PromotionCategoriesData {
  promotionCategories: PromotionCategory[];
}

interface Variables {
  promotionID: number;
}

const usePromotionCategoriesQuery = (
  options?: QueryHookOptions<PromotionCategoriesData, Variables>
) => useQuery<PromotionCategoriesData, Variables>(PROMOTIONS_CATEGORIES_QUERY, options);

export { usePromotionCategoriesQuery, PROMOTIONS_CATEGORIES_QUERY };
export type { PromotionCategoriesData, PromotionCategory };
