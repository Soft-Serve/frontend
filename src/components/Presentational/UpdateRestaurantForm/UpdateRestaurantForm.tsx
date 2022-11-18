import React from "react";
import type { FC } from "react";
import { ThemeFonts } from "@base";
import {
  UpdateRestaurantAddressForm,
  UpdateRestaurantFontForm,
  UpdateRestaurantSlugForm,
  UpdateRestaurantThemeForm,
} from "@presentational";
import type { Restaurant } from "@shared";
import { UpdateRestaurantLogo } from "../UpdateRestaurantLogo";
import { Box } from "@interface";

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
      <Box>
        <UpdateRestaurantSlugForm
          themeColour={themeColour}
          themeTint={themeTint}
          id={restaurant.id}
          slug={restaurant.slug}
        />
      </Box>
      <Box>
        <UpdateRestaurantThemeForm
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          id={restaurant.id}
          logo={restaurant.logo}
        />
      </Box>
      <Box>
        <UpdateRestaurantFontForm
          themeFont={themeFont}
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeTint={themeTint}
          id={restaurant.id}
        />
      </Box>
      <Box>
        <UpdateRestaurantLogo
          restaurantSlug={restaurantSlug}
          id={restaurant.id}
          logo={restaurant?.logo}
          themeColour={themeColour}
          themeTint={themeTint}
        />
      </Box>
      <Box>
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
      </Box>
    </>
  );
};

export { UpdateRestaurantForm };
