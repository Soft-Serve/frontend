import type { QueryHookOptions } from "@apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const BANNERS_QUERY = gql`
  query BannersQuery($restaurantSlug: string!) {
    banners(restaurantSlug: $restaurantSlug)
      @rest(type: Banner, path: "restaurants/{args.restaurantSlug}/banners/") {
      id
      header
      sub_header
      photo
      restaurant_id
      __typename
    }
  }
`;

interface Banner {
  id: number;
  header: string;
  sub_header: string;
  photo: string;
  restaurant_id: number;
  __typename: string;
}

interface BannersData {
  banners: Banner[];
}

interface Variables {
  restaurantSlug: string;
}

const useBannersQuery = (options?: QueryHookOptions<BannersData, Variables>) =>
  useQuery<BannersData, Variables>(BANNERS_QUERY, options);

export { useBannersQuery, BANNERS_QUERY };
export type { BannersData, Banner };
