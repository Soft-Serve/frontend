import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_THENE = gql`
  mutation UpdateRestaurantTheme($input: input) {
    updateRestaurantTheme(input: $input)
      @rest(type: Restaurant, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      colour
      tint
    }
  }
`;

interface Theme {
  __typename: string;
  id: number;
  colour: string;
  tint: number;
}

interface Variables {
  input: {
    id: number;
    colour: string;
    tint: number;
  };
}

interface UpdateRestaurantThemeData {
  __typename: string;
  updateRestaurantTheme: Theme;
}

const useUpdateRestaurantTheme = (
  options?: MutationHookOptions<UpdateRestaurantThemeData, Variables>
) => useMutation<UpdateRestaurantThemeData, Variables>(UPDATE_RESTAURANT_THENE, options);

export { useUpdateRestaurantTheme };
