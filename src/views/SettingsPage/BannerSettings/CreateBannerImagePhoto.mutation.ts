import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const CREATE_NEW_BANNER_IMAGE = gql`
  mutation CreateNewBannerImage($input: input) {
    createNewBannerImage(input: $input)
      @rest(type: Banner, path: "restaurants/{args.input.restaurant_id}/banners", method: "POST") {
      id
      header
      photo
    }
  }
`;

interface BannerImage {
  id: number;
  header: string;
  photo: string;
}

interface BannerInput {
  restaurant_id: number;
  photo: string;
  header: string;
}

interface Variables {
  input: BannerInput;
}

interface UpdateBannerImage {
  __typename: string;
  updatedUser: BannerImage[];
}

const useCreateNewBannerImage = (options?: MutationHookOptions<UpdateBannerImage, Variables>) =>
  useMutation<UpdateBannerImage, Variables>(CREATE_NEW_BANNER_IMAGE, options);

export { useCreateNewBannerImage };
