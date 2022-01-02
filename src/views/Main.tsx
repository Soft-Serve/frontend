import React, { Suspense, useState, lazy } from "react";
import type { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "react-loader-spinner";
import { MenuSlideOver, AllergyModal, AllergyFiltersSideMenu, Restaurant } from "@presentational";
import { MenuPage } from "./MenuPage";
import { MainNavigation } from "./MainNavigation";
import { SignInView } from "./SignInView";
import { SignUpView } from "./SignUpView";
import { MainMobileHeader } from "./MainHeader";
import { Providers } from "./Providers";

const Main: FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFiterSideMenuOpen, setIsFilterSideMenuOpen] = useState(false);
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);
  const SettingsPage = lazy(() => import("./SettingsPage/DefaultSettingsPage"));
  const LoadingScreen = (
    <div className="flex w-screen h-screen justify-center items-center">
      <Loader type="Grid" color="#000000" height={150} width={150} />
    </div>
  );

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
          <Suspense fallback={LoadingScreen}>
            <Routes>
              <Route path="/" element={<Restaurant />} />
              <Route path="settings/:id" element={<SettingsPage />} />
              <Route path="sign-in" element={<SignInView />} />
              <Route path="sign-ip" element={<SignUpView />} />
            </Routes>
          </Suspense>
        </MainMobileHeader>
      </MenuPage>
    </Providers>
  );
};

export { Main };
