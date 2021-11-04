import React, { useState } from "react";
import type { FC } from "react";
import { Restaurant } from "@presentational";
import { HeroBanner } from "@base";
import { MenuPage } from "../MenuPage";
import { MenuSlideOver } from "./MenuSlideOver";
import { GuestMobileHeader } from "./GuestMobileHeader";
import { GuestMobileNavigation } from "./GuestMobileNavigation";
import { GuestNavigation } from "./GuestNavigation.tsx";
import { GuestMobileSubHeader } from "./GuestMobileSubHeader";

const GuestPage: FC = () => {
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);

  return (
    <MenuPage>
      <MenuSlideOver isOpen={isMenuSlideOverOpen} onClose={setIsMenuSlideOverOpen} />
      <GuestNavigation />
      <GuestMobileHeader>
        <div className="lg:hidden block">
          <HeroBanner />
        </div>
        <GuestMobileSubHeader />
        <Restaurant />
      </GuestMobileHeader>
      <GuestMobileNavigation setIsMenuSlideOverOpen={setIsMenuSlideOverOpen} />
    </MenuPage>
  );
};

export { GuestPage };
