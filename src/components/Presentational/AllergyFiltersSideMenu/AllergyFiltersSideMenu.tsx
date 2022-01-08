import React from "react";
import type { FC } from "react";
import {
  MobileNavigation,
  MobileNavigationWrapper,
  MobileNavigationProfile,
  AllergyLegend,
} from "@presentational";
import { useRestaurantContext } from "@contexts";

interface Props {
  isOpen: boolean;
  onClose: any;
}

const AllergyFiltersSideMenu: FC<Props> = ({ isOpen, onClose }) => {
  const { themeColour, themeTint, themeFont, restaurantSlug } = useRestaurantContext();

  return (
    <MobileNavigation
      restaurantSlug={restaurantSlug}
      themeColour={themeColour}
      themeTint={themeTint}
      isOpen={isOpen}
      onClose={onClose}
    >
      <MobileNavigationWrapper themeColour={themeColour} themeTint={themeTint}>
        <AllergyLegend
          restaurantSlug={restaurantSlug}
          themeColour={themeColour}
          themeFont={themeFont}
          themeTint={themeTint}
        />
      </MobileNavigationWrapper>
      <MobileNavigationProfile />
    </MobileNavigation>
  );
};

export { AllergyFiltersSideMenu };
