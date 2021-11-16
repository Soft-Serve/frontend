import React from "react";
import type { FC } from "react";
import { Button } from "@base";
import { useRestaurantContext } from "@contexts";
import { buildTabTextStyles, buildTabStyles } from "./styles";

interface Props {
  isActive: boolean;
  tabIndex: number;
  numOfTabs: number;
  onClick: () => void;
}
const Tab: FC<Props> = ({ children, tabIndex, numOfTabs, isActive, onClick }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  return (
    <Button
      onClick={onClick}
      className={buildTabStyles(isActive, tabIndex, numOfTabs)}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{children}</span>
      <span aria-hidden="true" className={buildTabTextStyles(isActive, themeColour, themeTint)} />
    </Button>
  );
};

export { Tab };
