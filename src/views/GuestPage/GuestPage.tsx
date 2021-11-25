import React, { useState } from "react";
import type { FC } from "react";
import { Restaurant } from "@presentational";
import { HeroBanner } from "@base";
import { MenuPage } from "../MenuPage";
import { MenuSlideOver } from "./MenuSlideOver";
import { GuestMobileHeader } from "./GuestMobileHeader";
import { GuestNavigation } from "./GuestNavigation.tsx";
import { GuestMobileSubHeader } from "./GuestMobileSubHeader";
import { GuestMobileNavigation } from "./GuestMobileNavigation";

const GuestPage: FC = () => {
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);
  const [isGuestNavigationOpen, setIsGuestNavigationOpen] = useState(false);

  return (
    <MenuPage>
      <GuestMobileNavigation isOpen={isGuestNavigationOpen} onClose={setIsGuestNavigationOpen} />
      <MenuSlideOver isOpen={isMenuSlideOverOpen} onClose={setIsMenuSlideOverOpen} />
      <GuestNavigation />
      <GuestMobileHeader
        setIsMenuSlideOverOpen={setIsMenuSlideOverOpen}
        setIsGuestNavigationOpen={setIsGuestNavigationOpen}
      >
        <div className="lg:hidden block">
          <HeroBanner />
        </div>
        <GuestMobileSubHeader />
        <Restaurant />
      </GuestMobileHeader>
    </MenuPage>
  );
};

export { GuestPage };
