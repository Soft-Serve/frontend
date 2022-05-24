import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const POST_PROMOTION_CATEGORY_MUTATION = gql`
  mutation PostPromotionCategory($promotionID: number, $input: input) {
    postPromotionCategory(promotionID: $promotionID, input: $input)
      @rest(
        type: PromotionCategory
        path: "promotions/{args.promotionID}/promotion_categories"
        method: "POST"
      ) {
      discount
      unit
      promotion_id
      menu_category_id
      __typename
    }
  }
`;

interface PromotionCategory {
  discount: number;
  unit: string;
  promotion_id: number;
  menu_category_id: number;
  __typename: string;
}

interface PostPromotionCategoryData {
  postPromotionCategory: PromotionCategory;
}

interface Variables {
  promotionID: number;
  input: PromotionCategory;
}

const usePostPromotionCatgegoryMutation = (
  options?: MutationHookOptions<PostPromotionCategoryData, Variables>
) => useMutation<PostPromotionCategoryData, Variables>(POST_PROMOTION_CATEGORY_MUTATION, options);

export { usePostPromotionCatgegoryMutation };
export type { PostPromotionCategoryData };
