import React from "react";
import type { FC } from "react";

import { ItemImage } from "@presentational";
import { useBannersQuery, useRestaurantQuery } from "@shared";
import { Card, CardContent, HeroBanner, TabWrapper, UploadImageBox } from "@base";
import { classnames } from "tailwindcss-classnames";
import { useUploadPhoto } from "@hooks";
import { useRestaurantContext } from "@contexts";
import { SettingsHeader } from "../SettingsHeader";
import { UpdateBannerHeadingsForm } from "./UpdateBannerHeadingsForm";
import { SkeletonBannerSettings } from "./SkeletonBannerSettings";

const BannerSettings: FC = () => {
  const { restaurantSlug } = useRestaurantContext();
  const { data, loading } = useBannersQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  const { data: restaurantData, loading: restaurantLoading } = useRestaurantQuery();

  const { photoFile, setPhotoFile } = useUploadPhoto();
  if (loading || restaurantLoading) return <SkeletonBannerSettings />;

  return (
    <TabWrapper>
      <Card css="mb-4">
        <CardContent>
          <SettingsHeader>Banner</SettingsHeader>
        </CardContent>
      </Card>
      <Card>
        <HeroBanner />
      </Card>

      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateBannerHeadingsForm
          restaurantId={restaurantData?.restaurant?.id}
          subHeader={data?.banners?.[0]?.sub_header}
          header={data?.banners?.[0]?.header}
          id={data?.banners?.[0]?.id}
        />
        <label className="text-sm font-bold text-gray-900 block my-4 font-Quicksand">
          Hero image
        </label>
        <div className="flex items-center w-full justify-between flex-wrap">
          <div className="m-2">
            <ItemImage
              photoUrl={
                data?.banners?.[0]
                  ? data?.banners?.[0]?.photo
                  : restaurantData?.restaurant?.logo || ""
              }
            />
          </div>
          <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
        </div>
      </Card>
    </TabWrapper>
  );
};

export { BannerSettings };
