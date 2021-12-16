import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_FONT = gql`
  mutation UpdateRestaurantFont($input: input) {
    updateRestaurantFont(input: $input)
      @rest(type: Item, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      font
    }
  }
`;

interface Font {
  __typename: string;
  font: string;
  id: number;
}

interface Variables {
  input: {
    font: string;
    id: number;
  };
}

interface UpdateRestaurantFontData {
  __typename: string;
  updateRestaurantFont: Font;
}

const useUpdateRestaurantFont = (
  options?: MutationHookOptions<UpdateRestaurantFontData, Variables>
) => useMutation<UpdateRestaurantFontData, Variables>(UPDATE_RESTAURANT_FONT, options);

export { useUpdateRestaurantFont };
