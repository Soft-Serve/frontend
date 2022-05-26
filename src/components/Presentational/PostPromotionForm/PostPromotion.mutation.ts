import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const POST_PROMOTION_MUTATION = gql`
  mutation PostPromotion($input: input) {
    postPromotion(input: $input) @rest(type: Promotion, path: "promotions/", method: "POST") {
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
  restaurant_id: string;
  __typename: string;
}

interface PostPromotionData {
  postPromotion: Promotion;
}

interface Variables {
  input: Promotion;
}

const usePostPromotionMutation = (options?: MutationHookOptions<PostPromotionData, Variables>) =>
  useMutation<PostPromotionData, Variables>(POST_PROMOTION_MUTATION, options);

export { usePostPromotionMutation };
export type { PostPromotionData };
