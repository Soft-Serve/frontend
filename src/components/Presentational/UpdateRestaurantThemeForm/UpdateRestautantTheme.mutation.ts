import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_THENE = gql`
  mutation UpdateRestaurantTheme($input: input) {
    updateRestaurantTheme(input: $input)
      @rest(type: Item, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      name
      colour
      tint
      logo
    }
  }
`;

interface Theme {
  __typename: string;
  id: number;
  name: string;
  colour: string;
  tint: number;
  logo: string;
}

interface Variables {
  input: {
    id: number;
    name: string;
    colour: string;
    tint: number;
    logo: string;
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