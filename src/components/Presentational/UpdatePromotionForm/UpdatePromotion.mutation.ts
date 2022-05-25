import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_PROMOTION_MUTATION = gql`
  mutation UpdatePromotion($promotionID: number, $input: input) {
    updatePromotion(promotionID: $promotionID, input: $input)
      @rest(type: Promotion, path: "promotions/{args.promotionID}/", method: "PATCH") {
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

interface UpdatePromotionData {
  updatePromotion: Promotion;
}

interface Variables {
  promotionID: number;
  input: Promotion;
}

const useUpdatePromotionMutation = (
  options?: MutationHookOptions<UpdatePromotionData, Variables>
) => useMutation<UpdatePromotionData, Variables>(UPDATE_PROMOTION_MUTATION, options);

export { useUpdatePromotionMutation };
export type { UpdatePromotionData };
