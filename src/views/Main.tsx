import React, { Suspense, useState, lazy } from "react";
import type { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, LoadingScreen } from "@base";
import { MenuSlideOver, AllergyModal, AllergyFiltersSideMenu, Restaurant } from "@presentational";
import { MenuPage } from "./MenuPage";
import { MainNavigation } from "./MainNavigation";
import { MainMobileHeader } from "./MainMobileHeader";
import { Providers } from "./Providers";

const SettingsPage = lazy(() => import("./SettingsPage/DefaultSettingsPage"));
const SignInPage = lazy(() => import("./SignInPage/DefaultSignInPage"));

const Main: FC = () => {
  const { pathname } = useLocation();
  const isOnSettingsPage = pathname.includes("settings");

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFiterSideMenuOpen, setIsFilterSideMenuOpen] = useState(false);
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);

  const renderFooter = () => {
    if (isOnSettingsPage) return null;
    return <Footer />;
  };

  return (
    <Providers>
      <MenuPage>
        <AllergyFiltersSideMenu isOpen={isFiterSideMenuOpen} onClose={setIsFilterSideMenuOpen} />
        <AllergyModal isOpen={isFilterModalOpen} setIsFilterSideMenuOpen={setIsFilterModalOpen} />
        <MenuSlideOver isOpen={isMenuSlideOverOpen} onClose={setIsMenuSlideOverOpen} />
        <MainNavigation setIsFilterSideMenuOpen={setIsFilterModalOpen} />
        <MainMobileHeader
          setIsMenuSlideOverOpen={setIsMenuSlideOverOpen}
          setIsFilterSideMenuOpen={setIsFilterSideMenuOpen}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Restaurant />} />
              <Route path="settings/:id" element={<SettingsPage />} />
              <Route path="sign-in" element={<SignInPage />} />
            </Routes>
          </Suspense>
          {renderFooter()}
        </MainMobileHeader>
      </MenuPage>
    </Providers>
  );
};

export { Main };
