import React from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Card, ThemeFonts } from "@base";
import {
  UpdateRestaurantAddressForm,
  UpdateRestaurantFontForm,
  UpdateRestaurantSlugForm,
  UpdateRestaurantThemeForm,
} from "@presentational";
import type { Restaurant } from "@shared";
import { UpdateRestaurantLogo } from "../UpdateRestaurantLogo";

interface Props {
  restaurant: Restaurant;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  themeFont: ThemeFonts;
  backgroundColour: string;
  backgroundTint: number;
}

const UpdateRestaurantForm: FC<Props> = ({
  restaurant,
  themeTint,
  themeColour,
  restaurantSlug,
  themeFont,
}) => {
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
        <UpdateRestaurantLogo
          restaurantSlug={restaurantSlug}
          id={restaurant.id}
          logo={restaurant?.logo}
          themeColour={themeColour}
          themeTint={themeTint}
        />
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
