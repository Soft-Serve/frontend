import React, { useState } from "react";
import type { FC } from "react";
import { Restaurant } from "@presentational";
import { HeroBanner } from "@base";
import { MenuPage } from "../MenuPage";
import { MenuSlideOver } from "./MenuSlideOver";
import { GuestMobileHeader } from "./GuestMobileHeader";
import { GuestNavigation } from "./GuestNavigation.tsx";
import { GuestMobileSubHeader } from "./GuestMobileSubHeader";
import { AllergyFiltersSideMenu } from "./AllergyFiltersSideMenu";
import { AllergyModal } from "./AllergyModal";
import { Main } from "./Main";

const GuestPage: FC = () => {
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);
  const [isFiterSideMenuOpen, setIsFilterSideMenuOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <Main>
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
        <AllergyModal isOpen={isFilterModalOpen} setIsFilterSideMenuOpen={setIsFilterModalOpen} />
      </MenuPage>
    </Main>
  );
};

export { GuestPage };
