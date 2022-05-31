import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_BACKGROUND = gql`
  mutation UpdateRestaurantBackground($input: input) {
    updateRestaurantBackground(input: $input)
      @rest(type: Restaurant, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      background_colour
      background_tint
    }
  }
`;

interface Background {
  __typename: string;
  id: number;
  background_colour: string;
  background_tint: number;
}

interface Variables {
  input: {
    id: number;
    background_colour: string;
    background_tint: number;
  };
}

interface UpdateRestaurantBackgroundData {
  __typename: string;
  updateRestaurantBackground: Background;
}

const useUpdateRestaurantBackground = (
  options?: MutationHookOptions<UpdateRestaurantBackgroundData, Variables>
) => useMutation<UpdateRestaurantBackgroundData, Variables>(UPDATE_RESTAURANT_BACKGROUND, options);

export { useUpdateRestaurantBackground };
