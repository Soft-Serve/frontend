import React from "react";
import type { FC } from "react";
import { MobileNavigation, MobileNavigationWrapper, AllergyLegend } from "@presentational";
import type { ThemeFonts } from "@base";
import { Container } from "@interface";

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
      <MobileNavigationWrapper>
        <Container
          adjustHeight={100}
          className="rounded-lg bg-slate-50"
          isScrollable
          containerWidth="full"
        >
          <AllergyLegend
            restaurantSlug={restaurantSlug}
            themeColour={themeColour}
            themeFont={themeFont}
            themeTint={themeTint}
          />
        </Container>
      </MobileNavigationWrapper>
    </MobileNavigation>
  );
};

export { AllergyFiltersSideMenu };
