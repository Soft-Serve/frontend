import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "./RestaurantContext";

interface RestaurantSlug {
  id: string;
}
const FONTS = ["Sans", "Arima", "Baskerville", "Cardo", "Oswald", "Quicksand", "Raleway"];

const RestaurantProvider: FC = ({ children }) => {
  const [restaurantSlug, setRestaurantSlug] = useState("");
  const [themeColour, setThemeColour] = useState("red");
  const [themeTint, setThemeTint] = useState(400);
  const [themeFont, setThemeFont] = useState(FONTS[0]);
  const { id } = useParams<RestaurantSlug>();

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
