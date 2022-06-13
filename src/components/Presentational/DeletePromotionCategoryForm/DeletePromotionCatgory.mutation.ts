import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const DELETE_PROMOTION_CATEGORY_MUTATION = gql`
  mutation DeletePromotionCategory($promotionID: number, $input: input) {
    deletePromotionCategory(promotionID: $promotionID, input: $input)
      @rest(
        type: PromotionCategory
        path: "promotions/{args.promotionID}/promotion_categories/{args.input.id}"
        method: "DELETE"
      ) {
      id
      discount
      unit
      promotion_id
      menu_category_id
      menu_category_name
      menu_name
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
  menu_category_name: string;
  menu_name: string;
  __typename: string;
}

interface DeletePromotionCategoryData {
  deletePromotionCategory: PromotionCategory;
}

interface Variables {
  promotionID: number;
  input: PromotionCategory;
}

const useDeletePromotionCatgegoryMutation = (
  options?: MutationHookOptions<DeletePromotionCategoryData, Variables>
) =>
  useMutation<DeletePromotionCategoryData, Variables>(DELETE_PROMOTION_CATEGORY_MUTATION, options);

export { useDeletePromotionCatgegoryMutation };
export type { DeletePromotionCategoryData, PromotionCategory };
