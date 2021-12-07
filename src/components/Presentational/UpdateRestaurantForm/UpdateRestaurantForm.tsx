import React from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import Skeleton from "react-loading-skeleton";
import { Card, UploadImageBox } from "@base";
import { useUploadPhoto } from "@hooks";
import {
  ItemImage,
  UpdateRestaurantAddressForm,
  UpdateRestaurantSlugForm,
  UpdateRestaurantThemeForm,
} from "@presentational";
import { useBannersQuery } from "@shared";
import type { Restaurant } from "./UpdateRestaurant.mutation";

interface Props {
  restaurant: Restaurant;
}

const UpdateRestaurantForm: FC<Props> = ({ restaurant }) => {
  const { photoFile, setPhotoFile } = useUploadPhoto();

  const { data: bannerData, loading } = useBannersQuery({
    variables: {
      restaurantSlug: restaurant.slug,
    },
  });

  if (loading) return <Skeleton height={40} />;

  return (
    <>
      <Card withPadding={false} css={classnames("flex-col")}>
        <UpdateRestaurantSlugForm id={restaurant.id} slug={restaurant.slug} />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateRestaurantThemeForm
          id={restaurant.id}
          restaurantThemeTint={restaurant.tint}
          restaurantThemeColour={restaurant.colour}
          restaurantName={restaurant.name}
          logo={restaurant.logo}
        />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <label className="text-sm font-medium text-gray-900 block my-4">Restaurant Logo</label>
        <div className="flex items-center w-full justify-between flex-wrap">
          <div className="m-2">
            <ItemImage photoUrl={restaurant.logo} />
          </div>
          <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
        </div>
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <label className="text-sm font-medium text-gray-900 block my-4">Restaurant Banner</label>
        <div className="flex items-center w-full justify-between flex-wrap">
          <div className="m-2">
            <ItemImage
              photoUrl={bannerData?.banners?.[0] ? bannerData?.banners?.[0].photo : restaurant.logo}
            />
          </div>
          <UploadImageBox onChange={setPhotoFile} imageFile={photoFile} />
        </div>
      </Card>
      <Card css="mt-4">
        <UpdateRestaurantAddressForm
          restaurantName={restaurant.name}
          id={restaurant.id}
          addressLineOne={restaurant.address_line_1}
          addressLineTwo={restaurant.address_line_2}
          city={restaurant.city}
          province={restaurant.province}
          postalCode={restaurant.postal_code}
        />
      </Card>
    </>
  );
};

export { UpdateRestaurantForm };
