import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { GlobalContext } from "@contexts";
import { useRestaurantQuery } from "@shared";
import { useParams } from "react-router-dom";

const GlobalProvider: FC = ({ children }) => {
  const [menuID, setMenuID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);
  const [restaurantSlug, setRestaurantSlug] = useState("oliverandbonacini");
  const [activeMenu, setActiveMenu] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [themeColour, setThemeColour] = useState("red");
  const [themeTint, setThemeTint] = useState(400);
  const [textColour, setTextColour] = useState("#2D3142");

  type RestaurantSlug = {
    id: string;
  };

  const { id } = useParams<RestaurantSlug>();

  const { data } = useRestaurantQuery({
    variables: {
      restaurantSlug: id,
    },
  });

  useEffect(() => {
    if (data?.restaurant.slug) {
      setRestaurantSlug(data?.restaurant.slug);
    }
  }, [data]);

  return (
    <GlobalContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        restaurantSlug,
        setRestaurantSlug,
        menuID,
        setMenuID,
        categoryID,
        setCategoryID,
        currentUser,
        setCurrentUser,
        themeColour,
        setThemeColour,
        themeTint,
        setThemeTint,
        textColour,
        setTextColour,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider };
