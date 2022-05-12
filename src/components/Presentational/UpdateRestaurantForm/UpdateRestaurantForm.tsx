import React from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Card, ThemeFonts, UploadImageBox } from "@base";
import { useUploadPhoto } from "@hooks";
import {
  ItemImage,
  UpdateRestaurantAddressForm,
  UpdateRestaurantFontForm,
  UpdateRestaurantSlugForm,
  UpdateRestaurantThemeForm,
} from "@presentational";
import type { Restaurant } from "./UpdateRestaurant.mutation";

interface Props {
  restaurant: Restaurant;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  themeFont: ThemeFonts;
}

const UpdateRestaurantForm: FC<Props> = ({
  restaurant,
  themeTint,
  themeColour,
  restaurantSlug,
  themeFont,
}) => {
  const { photoFile, setPhotoFile } = useUploadPhoto();

  return (
    <>
      <Card withPadding={false} css={classnames("flex-col")}>
        <UpdateRestaurantSlugForm
          themeColour={themeColour}
          themeTint={themeTint}
          id={restaurant.id}
          slug={restaurant.slug}
        />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateRestaurantThemeForm
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          id={restaurant.id}
          restaurantThemeTint={restaurant.tint}
          restaurantThemeColour={restaurant.colour}
          restaurantName={restaurant.name}
          logo={restaurant.logo}
        />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <UpdateRestaurantFontForm
          themeFont={themeFont}
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          id={restaurant.id}
        />
      </Card>
      <Card css={classnames("flex-col", "mt-4")}>
        <label className="my-4 block font-Quicksand text-sm font-bold text-gray-900">
          Restaurant Logo
        </label>
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="m-2">
            <ItemImage width={208} photoUrl={restaurant.logo} />
          </div>
          <UploadImageBox
            themeColour={themeColour}
            themeTint={themeTint}
            onChange={setPhotoFile}
            imageFile={photoFile}
          />
        </div>
      </Card>
      <Card css="mt-4">
        <UpdateRestaurantAddressForm
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
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
