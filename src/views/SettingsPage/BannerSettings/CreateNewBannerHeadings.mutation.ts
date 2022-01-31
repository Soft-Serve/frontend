import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const CREATE_NEW_BANNER_HEADINGS = gql`
  mutation CreateNewBannerHeadings($input: input) {
    createNewBanner(input: $input)
      @rest(type: Banner, path: "restaurants/{args.input.restaurant_id}/banners", method: "POST") {
      id
      header
      sub_header
      photo
    }
  }
`;

interface BannerHeaders {
  id: number;
  header: string;
  sub_header: string;
}

interface BannerHeadersInput extends Omit<BannerHeaders, "id"> {
  restaurant_id: number;
  photo: string;
}

interface Variables {
  input: BannerHeadersInput;
}

interface UpdateBannerHeaders {
  __typename: string;
  updatedUser: BannerHeaders[];
}

const useCreateNewBannerHeaders = (options?: MutationHookOptions<UpdateBannerHeaders, Variables>) =>
  useMutation<UpdateBannerHeaders, Variables>(CREATE_NEW_BANNER_HEADINGS, options);

export { useCreateNewBannerHeaders };
