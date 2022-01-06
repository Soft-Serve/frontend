import React, { Suspense, useState, lazy } from "react";
import type { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Footer } from "@base";
import { MenuSlideOver, AllergyModal, AllergyFiltersSideMenu, Restaurant } from "@presentational";
import { MenuPage } from "./MenuPage";
import { MainNavigation } from "./MainNavigation";
import { MainMobileHeader } from "./MainMobileHeader";
import { Providers } from "./Providers";

const Main: FC = () => {
  const { pathname } = useLocation();
  const isOnSettingsPage = pathname.includes("settings");

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFiterSideMenuOpen, setIsFilterSideMenuOpen] = useState(false);
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);
  const [isSubNavOpen, setIsSubNavOpen] = useState(false);
  const SettingsPage = lazy(() => import("./SettingsPage/DefaultSettingsPage"));
  const SignInPage = lazy(() => import("./SignInPage/DefaultSignInPage"));
  const SignUpPage = lazy(() => import("./SignUpPage/DefaultSignUpPage"));

  const LoadingScreen = (
    <div className="flex w-screen h-screen justify-center items-center ">
      <Loader type="MutatingDots" height={130} width={130} />
    </div>
  );

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
          setisSubSettingsSlideOverOpen={setIsSubNavOpen}
          setIsMenuSlideOverOpen={setIsMenuSlideOverOpen}
          setIsFilterSideMenuOpen={setIsFilterSideMenuOpen}
        >
          <Suspense fallback={LoadingScreen}>
            <Routes>
              <Route path="/" element={<Restaurant />} />
              <Route
                path="settings/:id"
                element={<SettingsPage isOpen={isSubNavOpen} onClose={setIsSubNavOpen} />}
              />
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
            </Routes>
          </Suspense>
          {renderFooter()}
        </MainMobileHeader>
      </MenuPage>
    </Providers>
  );
};

export { Main };
