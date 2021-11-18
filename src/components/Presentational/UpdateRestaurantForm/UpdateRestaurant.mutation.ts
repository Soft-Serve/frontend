import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT = gql`
  mutation UpdateRestaurant($input: input) {
    updatedRestaurant(input: $input)
      @rest(type: Item, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      name
      currency
      colour
      tint
      logo
      slug
      address_line_1
      address_line_2
      city
      province
      postal_code
      country
    }
  }
`;

interface Restaurant {
  __typename: string;
  id: number;
  name: string;
  colour: string;
  tint: number;
  logo: string;
  slug: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

interface Variables {
  input: Restaurant;
}

interface UpdateRestaurantData {
  __typename: string;
  updatedRestaurant: Restaurant;
}

const useUpdateRestaurant = (options?: MutationHookOptions<UpdateRestaurantData, Variables>) =>
  useMutation<UpdateRestaurantData, Variables>(UPDATE_RESTAURANT, options);

export { useUpdateRestaurant };
export type { Restaurant };
