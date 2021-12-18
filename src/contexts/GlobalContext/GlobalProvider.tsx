import React, { useState } from "react";
import Loader from "react-loader-spinner";
import type { FC } from "react";
import { GlobalContext, useRestaurantContext } from "@contexts";
import { useRestaurantQuery } from "src/shared";

const GlobalProvider: FC = ({ children }) => {
  const [menuID, setMenuID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);
  const [activeMenu, setActiveMenu] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const { restaurantSlug, setThemeColour, setThemeTint, setThemeFont } = useRestaurantContext();

  const { loading } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
    onCompleted: completedData => {
      setMenuID(completedData?.restaurant?.id);
      setThemeColour(completedData?.restaurant?.colour);
      setThemeTint(completedData?.restaurant?.tint);
      setThemeFont(completedData?.restaurant?.font || "Quicksand");
    },
  });

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <Loader type="Grid" color="#f87171" height={150} width={150} />
      </div>
    );
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
