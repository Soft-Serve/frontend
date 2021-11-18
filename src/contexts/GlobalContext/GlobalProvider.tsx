import React, { useState } from "react";
import type { FC } from "react";
import { GlobalContext, useRestaurantContext } from "@contexts";
import { useRestaurantQuery } from "src/shared";
import { LoadingSVG } from "@svgs";

const GlobalProvider: FC = ({ children }) => {
  const [menuID, setMenuID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);
  const [activeMenu, setActiveMenu] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const { restaurantSlug, setThemeColour, setThemeTint } = useRestaurantContext();

  const { loading } = useRestaurantQuery({
    variables: {
      restaurantSlug,
    },
    skip: !restaurantSlug,
    onCompleted: completedData => {
      setMenuID(completedData?.restaurant?.id);
      setThemeColour(completedData?.restaurant?.colour);
      setThemeTint(completedData?.restaurant?.tint);
    },
  });

  if (loading) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span
          className=" opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
          style={{
            top: "50%",
          }}
        >
          <LoadingSVG className="text-red-400 w-24 h-24 md:w-14 md:h-14 animate-spin" />
        </span>
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
