import React, { Suspense, useState, lazy } from "react";
import type { FC } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import { Footer, LoadingScreen } from "@base";
import { MenuSlideOver, AllergyModal, AllergyFiltersSideMenu, Restaurant } from "@presentational";
import { useRestaurantThemeQuery } from "@shared";
import { MenuPage } from "./MenuPage";
import { MainNavigation } from "./MainNavigation";
import { MainMobileHeader } from "./MainMobileHeader";
import { SignInPage } from "./SignInPage";
import { Providers } from "./Providers";

const SettingsPage = lazy(() => import("./SettingsPage/DefaultSettingsPage"));

type Param = {
  id: string;
};

const Main: FC = () => {
  const { pathname } = useLocation();
  const { id: restaurantSlug } = useParams<Param>() as Param;
  const isOnSettingsPage = pathname.includes("settings");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFiterSideMenuOpen, setIsFilterSideMenuOpen] = useState(false);
  const [isMenuSlideOverOpen, setIsMenuSlideOverOpen] = useState(false);
  const [menuID, setMenuID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);
  const [activeMenu, setActiveMenu] = useState("");

  const { data, loading } = useRestaurantThemeQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
  });

  if (loading) {
    return <LoadingScreen />;
  }

  const renderFooter = () => {
    if (isOnSettingsPage) return null;
    return (
      <Footer
        themeTint={data?.restaurant?.tint || 400}
        themeColour={data?.restaurant?.colour || "red"}
      />
    );
  };

  return (
    <MenuPage>
      <Providers>
        <AllergyFiltersSideMenu
          themeTint={data?.restaurant?.tint || 400}
          restaurantSlug={restaurantSlug}
          themeFont={data?.restaurant?.font || "Quicksand"}
          themeColour={data?.restaurant?.colour || "red"}
          isOpen={isFiterSideMenuOpen}
          onClose={setIsFilterSideMenuOpen}
        />
        <AllergyModal
          themeTint={data?.restaurant?.tint || 400}
          restaurantSlug={restaurantSlug}
          themeFont={data?.restaurant?.font || "Quicksand"}
          themeColour={data?.restaurant?.colour || "red"}
          isOpen={isFilterModalOpen}
          setIsFilterSideMenuOpen={setIsFilterModalOpen}
        />
        <MenuSlideOver
          menuID={menuID}
          setMenuID={setMenuID}
          themeTint={data?.restaurant?.tint || 400}
          restaurantSlug={restaurantSlug}
          themeFont={data?.restaurant?.font || "Quicksand"}
          themeColour={data?.restaurant?.colour || "red"}
          isOpen={isMenuSlideOverOpen}
          onClose={setIsMenuSlideOverOpen}
        />
        <MainNavigation
          themeTint={data?.restaurant?.tint || 400}
          restaurantSlug={restaurantSlug}
          themeFont={data?.restaurant?.font || "Quicksand"}
          themeColour={data?.restaurant?.colour || "red"}
          setIsFilterSideMenuOpen={setIsFilterModalOpen}
        />
        <MainMobileHeader
          themeTint={data?.restaurant?.tint || 400}
          restaurantSlug={restaurantSlug}
          themeFont={data?.restaurant?.font || "Quicksand"}
          themeColour={data?.restaurant?.colour || "red"}
          setIsMenuSlideOverOpen={setIsMenuSlideOverOpen}
          setIsFilterSideMenuOpen={setIsFilterSideMenuOpen}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Restaurant
                    categoryID={categoryID}
                    activeMenu={activeMenu}
                    menuID={menuID}
                    setActiveMenu={setActiveMenu}
                    setCategoryID={setCategoryID}
                    setMenuID={setMenuID}
                  />
                }
              />
              <Route
                path="settings/:id"
                element={<SettingsPage restaurantSlug={restaurantSlug} />}
              />
              <Route path="sign-in" element={<SignInPage restaurantSlug={restaurantSlug} />} />
            </Routes>
          </Suspense>
          {renderFooter()}
        </MainMobileHeader>
      </Providers>
    </MenuPage>
  );
};

export { Main };
