import React from "react";
import type { FC } from "react";
import {
  MobileNavigation,
  MobileNavigationWrapper,
  MobileNavigationProfile,
  AllergyLegend,
} from "@presentational";
import type { ThemeFonts } from "@base";

interface Props {
  isOpen: boolean;
  onClose: any;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
  restaurantSlug: string;
}

const AllergyFiltersSideMenu: FC<Props> = ({
  isOpen,
  onClose,
  themeColour,
  themeTint,
  restaurantSlug,
  themeFont,
}) => {
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
