import React from "react";
import type { FC } from "react";
import { useRestaurantContext } from "@contexts";

const SettingsHeader: FC = ({ children }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  return <h2 className={`text-3xl font-extrabold text-${themeColour}-${themeTint}`}>{children}</h2>;
};

export { SettingsHeader };
