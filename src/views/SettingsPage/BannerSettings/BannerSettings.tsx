import React from "react";
import type { FC } from "react";

import { ItemImage } from "@presentational";
import { BANNERS_QUERY, useBannersQuery, useRestaurantQuery } from "@shared";
import { Button, Card, CardContent, HeroBanner, TabWrapper, UploadImageBox } from "@base";
import { classnames } from "tailwindcss-classnames";
import { useUploadPhoto } from "@hooks";
import { SettingsHeader } from "../SettingsHeader";
import { UpdateBannerHeadingsForm } from "./UpdateBannerHeadingsForm";
import { SkeletonBannerSettings } from "./SkeletonBannerSettings";
import { useUpdateBannerImageMutation } from "./UpdateBannerImage.mutation";

interface Props {
  themeColour: string;
  themeTint: number;
  themeFont: string;
  restaurantSlug: string;
}
const BannerSettings: FC<Props> = ({ themeTint, themeColour, themeFont, restaurantSlug }) => {
  const { data, loading } = useBannersQuery({
    variables: {
      restaurantSlug,
    },
  });

  console.log(data?.banners);
  const { data: restaurantData, loading: restaurantLoading } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
  });

  const [updatePhoto, { loading: imageLoading }] = useUpdateBannerImageMutation();
  const { photoFile, setPhotoFile, fetchPhoto } = useUploadPhoto();

  const handleUpdatePhoto = async () => {
    const photo = await fetchPhoto();
    updatePhoto({
      variables: {
        input: {
          id: data?.banners?.[0]?.id || 0,
          restaurantId: restaurantData?.restaurant?.id || 0,
          photo,
        },
      },
      refetchQueries: [
        {
          query: BANNERS_QUERY,
          variables: {
            restaurantSlug,
          },
        },
      ],
    });
  };
  if (loading || restaurantLoading) return <SkeletonBannerSettings />;

  return (
    <TabWrapper>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Banner</SettingsHeader>
        </CardContent>
      </Card>
      <Card>
        <HeroBanner
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeFont={themeFont}
        />
      </Card>

      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateBannerHeadingsForm
          photo={
            data?.banners?.[0] ? data?.banners?.[0]?.photo : restaurantData?.restaurant?.logo || ""
          }
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          restaurantId={restaurantData?.restaurant?.id}
          subHeader={data?.banners?.[0]?.sub_header}
          header={data?.banners?.[0]?.header}
          id={data?.banners?.[0]?.id}
        />
        <label className="my-4 block font-Quicksand text-sm font-bold text-gray-900">
          Hero image
        </label>
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="m-2">
            <ItemImage
              photoUrl={
                data?.banners?.[0]
                  ? data?.banners?.[0]?.photo
                  : restaurantData?.restaurant?.logo || ""
              }
            />
          </div>
          <UploadImageBox
            themeColour={themeColour}
            themeTint={themeTint}
            onChange={setPhotoFile}
            imageFile={photoFile}
          />
        </div>
        <Button
          loading={imageLoading}
          onClick={handleUpdatePhoto}
          disabled={!photoFile}
          size="XXL"
          themeColour={themeColour}
          themeTint={themeTint}
        >
          Update banner photo
        </Button>
      </Card>
    </TabWrapper>
  );
};

export { BannerSettings };
