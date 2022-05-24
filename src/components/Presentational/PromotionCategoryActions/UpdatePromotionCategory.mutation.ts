import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_PROMOTION_CATEGORY_MUTATION = gql`
  mutation UpdatePromotionCategory($promotionID: number, $input: input) {
    updatePromotionCategory(promotionID: $promotionID, input: $input)
      @rest(
        type: PromotionCategory
        path: "promotions/{args.promotionID}/promotion_categories/{args.input.id}"
        method: "PATCH"
      ) {
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

interface UpdatePromotionCategoryData {
  updatePromotionCategory: PromotionCategory;
}

interface Variables {
  promotionID: number;
  input: PromotionCategory;
}

const useUpdatePromotionCatgegoryMutation = (
  options?: MutationHookOptions<UpdatePromotionCategoryData, Variables>
) =>
  useMutation<UpdatePromotionCategoryData, Variables>(UPDATE_PROMOTION_CATEGORY_MUTATION, options);

export { useUpdatePromotionCatgegoryMutation };
export type { PromotionCategory };
