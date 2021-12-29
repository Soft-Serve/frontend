import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "./RestaurantContext";

type Param = {
  id: string;
};

const RestaurantProvider: FC = ({ children }) => {
  const { id } = useParams<Param>() as Param;
  const [restaurantSlug, setRestaurantSlug] = useState(id);
  const [themeColour, setThemeColour] = useState("red");
  const [themeTint, setThemeTint] = useState(400);
  const [themeFont, setThemeFont] = useState("Quicksand");

  useEffect(() => {
    setRestaurantSlug(id);
  }, [id]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurantSlug,
        setRestaurantSlug,
        themeColour,
        setThemeColour,
        themeTint,
        setThemeTint,
        themeFont,
        setThemeFont,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantProvider };
