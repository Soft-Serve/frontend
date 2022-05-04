import React, { Suspense, useState, lazy } from "react";
import type { FC } from "react";
import { Route, Routes, useLocation, useParams, Navigate } from "react-router-dom";
import { Footer, LoadingScreen } from "@base";
import { MenuSlideOver, AllergyModal, AllergyFiltersSideMenu, Restaurant } from "@presentational";
import { useRestaurantThemeQuery } from "@shared";
import { MenuPage } from "../MenuPage";
import { Providers } from "./Providers";
import { MainNavigation } from "./MainNavigation";
import { MainMobileHeader } from "./MainMobileHeader";

const SettingsPage = lazy(() => import("../SettingsPage/DefaultSettingsPage"));

type Param = {
  id: string;
};

const MainPage: FC = () => {
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

  const renderFooter = () => {
    if (isOnSettingsPage) return null;
    return (
      <Footer
        themeTint={data?.restaurant?.tint || 400}
        themeColour={data?.restaurant?.colour || "red"}
      />
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (data?.restaurant) {
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
              </Routes>
            </Suspense>
            {renderFooter()}
          </MainMobileHeader>
        </Providers>
      </MenuPage>
    );
  }

  return <Navigate to="/not-found" />;
};

export { MainPage };