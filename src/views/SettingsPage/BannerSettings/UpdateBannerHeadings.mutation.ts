import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_BANNER_HEADINGS = gql`
  mutation UpdateBannerHeadings($input: input) {
    updateBannerHeaders(input: $input)
      @rest(
        type: Item
        path: "/restaurants/{args.input.restaurantId}/banners/{args.input.id}"
        method: "PATCH"
      ) {
      id
      header
      sub_header
    }
  }
`;

interface BannerHeaders {
  id: number;
  header: string;
  sub_header: string;
}

interface BannerHeadersInput extends BannerHeaders {
  restaurantId: number;
}

interface Variables {
  input: BannerHeadersInput;
}

interface UpdateBannerHeaders {
  __typename: string;
  updatedUser: BannerHeaders;
}

const useUpdateBannerHeaders = (options?: MutationHookOptions<UpdateBannerHeaders, Variables>) =>
  useMutation<UpdateBannerHeaders, Variables>(UPDATE_BANNER_HEADINGS, options);

export { useUpdateBannerHeaders };
