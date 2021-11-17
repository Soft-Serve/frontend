import React, { useState } from "react";
import type { FC } from "react";
import { Fab } from "react-tiny-fab";
import { BookOpenIcon } from "@heroicons/react/solid";
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
      <GuestMobileHeader setIsGuestNavigationOpen={setIsGuestNavigationOpen}>
        <div className="lg:hidden block">
          <HeroBanner />
        </div>
        <GuestMobileSubHeader />
        <Restaurant />
      </GuestMobileHeader>
      <div className="lg:hidden block">
        <Fab
          text="Menus"
          onClick={() => setIsMenuSlideOverOpen(prevState => !prevState)}
          icon={<BookOpenIcon className="text-white bg-gray-900 rounded-full p-2" />}
        />
      </div>
    </MenuPage>
  );
};

export { GuestPage };
