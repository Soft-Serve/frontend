import React, { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router";
import { GlobalContext, useRestaurantContext } from "@contexts";
import { LoadingScreen } from "@base";
import { useRestaurantThemeQuery } from "./RestaurantTheme.query";

const GlobalProvider: FC = ({ children }) => {
  const [menuID, setMenuID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);
  const [activeMenu, setActiveMenu] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const { restaurantSlug, setThemeColour, setThemeTint, setThemeFont } = useRestaurantContext();
  const navigate = useNavigate();

  const { loading } = useRestaurantThemeQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
    onCompleted: completedData => {
      if (completedData?.restaurant) {
        setMenuID(completedData?.restaurant?.id);
        setThemeColour(completedData?.restaurant?.colour);
        setThemeTint(completedData?.restaurant?.tint);
        setThemeFont(completedData?.restaurant?.font || "Quicksand");
      } else {
        navigate("/*");
      }
    },
    onError: () => navigate("/*"),
  });

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <GlobalContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        menuID,
        setMenuID,
        categoryID,
        setCategoryID,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalProvider };
