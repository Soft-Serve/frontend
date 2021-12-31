import React, { useState } from "react";
import type { FC } from "react";
import { AllergyLegend, Restaurant } from "@presentational";
import { useRestaurantContext } from "@contexts";
import { TArg } from "tailwindcss-classnames";
import { Button, HeroBanner, Modal } from "@base";
import { MenuPage } from "../MenuPage";
import { MenuSlideOver } from "./MenuSlideOver";
import { GuestMobileHeader } from "./GuestMobileHeader";
import { GuestNavigation } from "./GuestNavigation.tsx";
import { GuestMobileSubHeader } from "./GuestMobileSubHeader";
import { AllergyFiltersSideMenu } from "./AllergyFiltersSideMenu";

const GuestPage: FC = () => {
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);
  const [isFiterSideMenuOpen, setIsFilterSideMenuOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const { themeColour, themeTint } = useRestaurantContext();
  const bgColour = `bg-${themeColour}-${themeTint}` as TArg;
  return (
    <MenuPage>
      <AllergyFiltersSideMenu isOpen={isFiterSideMenuOpen} onClose={setIsFilterSideMenuOpen} />
      <MenuSlideOver isOpen={isMenuSlideOverOpen} onClose={setIsMenuSlideOverOpen} />
      <GuestNavigation setIsFilterSideMenuOpen={setIsFilterModalOpen} />
      <GuestMobileHeader
        setIsMenuSlideOverOpen={setIsMenuSlideOverOpen}
        setIsFilterSideMenuOpen={setIsFilterSideMenuOpen}
      >
        <div className="lg:hidden block">
          <HeroBanner />
        </div>
        <GuestMobileSubHeader />
        <Restaurant />
      </GuestMobileHeader>
      <Modal css={bgColour} onClose={setIsFilterModalOpen} isOpen={isFilterModalOpen}>
        <AllergyLegend />
        <Button
          onClick={() => setIsFilterModalOpen(prevState => !prevState)}
          size="XXL"
          colour="accent"
          isFullwidth
        >
          close
        </Button>
      </Modal>
    </MenuPage>
  );
};

export { GuestPage };
