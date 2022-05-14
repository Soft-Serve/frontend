import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_ADDRESS = gql`
  mutation UpdateRestaurant($input: input) {
    updatedRestaurant(input: $input)
      @rest(type: Item, path: "restaurants/{args.input.id}", method: "PATCH") {
      name
      id
      address_line_1
      address_line_2
      city
      province
      postal_code
    }
  }
`;

interface Restaurant {
  id: number;
  name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  province: string;
  postal_code: string;
}

interface Variables {
  input: Restaurant;
}

interface UpdateRestaurantData {
  __typename: string;
  updatedRestaurant: Restaurant;
}

const useUpdateRestaurantAddress = (
  options?: MutationHookOptions<UpdateRestaurantData, Variables>
) => useMutation<UpdateRestaurantData, Variables>(UPDATE_RESTAURANT_ADDRESS, options);

export { useUpdateRestaurantAddress };
