import React from "react";
import type { FC } from "react";
import { useGlobalContext } from "src/contexts";

const SettingsHeader: FC = ({ children }) => {
  const { themeColour, themeTint } = useGlobalContext();
  return <h2 className={`text-3xl font-extrabold text-${themeColour}-${themeTint}`}>{children}</h2>;
};

export { SettingsHeader };
