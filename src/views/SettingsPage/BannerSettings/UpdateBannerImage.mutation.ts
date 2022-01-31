import gql from "graphql-tag";
import type { MutationHookOptions } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const UPDATE_BANNER_IMAGE = gql`
  mutation UpdateBannerImage($input: input) {
    updateBannerImage(input: $input)
      @rest(
        type: Banner
        path: "restaurants/{args.input.restaurantId}/banners/{args.input.id}"
        method: "PATCH"
      ) {
      id
      photo
    }
  }
`;

interface BannerImage {
  id: number;
  photo: string;
}

interface BannerImageInput extends BannerImage {
  restaurantId: number;
}

interface Variables {
  input: BannerImageInput;
}

interface UpdateBannerImage {
  __typename: string;
  updatedUser: BannerImage;
}

const useUpdateBannerImageMutation = (
  options?: MutationHookOptions<UpdateBannerImage, Variables>
) => useMutation<UpdateBannerImage, Variables>(UPDATE_BANNER_IMAGE, options);

export { useUpdateBannerImageMutation };
