import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_LOGO = gql`
  mutation UpdateRestaurantSlug($input: input) {
    updateRestaurantSlug(input: $input)
      @rest(type: Item, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      logo
    }
  }
`;

interface Logo {
  __typename: string;
  logo: string;
  id: number;
}

interface Variables {
  input: {
    logo: string;
    id: number;
  };
}

interface UpdateRestaurantLogoData {
  __typename: string;
  updateRestaurantLogo: Logo;
}

const useUpdateRestaurantLogo = (
  options?: MutationHookOptions<UpdateRestaurantLogoData, Variables>
) => useMutation<UpdateRestaurantLogoData, Variables>(UPDATE_RESTAURANT_LOGO, options);

export { useUpdateRestaurantLogo };
