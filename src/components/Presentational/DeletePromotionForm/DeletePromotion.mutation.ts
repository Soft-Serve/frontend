import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const DELETE_PROMOTION_MUTATION = gql`
  mutation DeletePromotion($promotionID: number) {
    deletePromotion(promotionID: $promotionID)
      @rest(type: Promotion, path: "promotions/{args.promotionID}", method: "DELETE") {
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

interface DeletePromotionData {
  deletePromotion: Promotion;
}

interface Variables {
  promotionID: number;
}

const useDeletePromotionMutation = (
  options?: MutationHookOptions<DeletePromotionData, Variables>
) => useMutation<DeletePromotionData, Variables>(DELETE_PROMOTION_MUTATION, options);

export { useDeletePromotionMutation };
export type { DeletePromotionData };
