import React, { useState } from "react";
import type { FC } from "react";
import { Restaurant } from "@presentational";
import { HeroBanner, FloatingMenu } from "@base";
import { useCurrentUserQuery } from "@shared";
import { MenuPage } from "../MenuPage";
import { MenuSlideOver } from "./MenuSlideOver";
import { GuestMobileHeader } from "./GuestMobileHeader";
import { GuestMobileNavigation } from "./GuestMobileNavigation";
import { GuestNavigation } from "./GuestNavigation.tsx";
import { GuestMobileSubHeader } from "./GuestMobileSubHeader";

const GuestPage: FC = () => {
  const { data } = useCurrentUserQuery();
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);

  return (
    <MenuPage>
      <MenuSlideOver isOpen={isMenuSlideOverOpen} onClose={setIsMenuSlideOverOpen} />
      <GuestNavigation />
      <GuestMobileHeader setIsMenuSlideOverOpen={setIsMenuSlideOverOpen}>
        <div className="lg:hidden block">
          <HeroBanner />
        </div>
        <GuestMobileSubHeader />
        <Restaurant />
      </GuestMobileHeader>
      {data?.currentUser && (
        <GuestMobileNavigation setIsMenuSlideOverOpen={setIsMenuSlideOverOpen} />
      )}
      <FloatingMenu setIsMenuSlideOverOpen={setIsMenuSlideOverOpen} />
    </MenuPage>
  );
};

export { GuestPage };
