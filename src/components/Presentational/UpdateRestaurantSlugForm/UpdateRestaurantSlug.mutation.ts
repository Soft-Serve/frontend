import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_RESTAURANT_SLUG = gql`
  mutation UpdateRestaurantSlug($input: input) {
    updateRestaurantSlug(input: $input)
      @rest(type: Item, path: "restaurants/{args.input.id}", method: "PATCH") {
      __typename
      id
      slug
    }
  }
`;

interface Slug {
  __typename: string;
  slug: string;
  id: number;
}

interface Variables {
  input: {
    slug: string;
    id: number;
  };
}

interface UpdateRestaurantSlugData {
  __typename: string;
  updateRestaurantSlug: Slug;
}

const useUpdateRestaurantSlug = (
  options?: MutationHookOptions<UpdateRestaurantSlugData, Variables>
) => useMutation<UpdateRestaurantSlugData, Variables>(UPDATE_RESTAURANT_SLUG, options);

export { useUpdateRestaurantSlug };
