import React from "react";
import type { FC } from "react";
import { Button, ThemeFonts } from "@base";
import { buildTabTextStyles, buildTabStyles } from "./styles";

interface Props {
  themeColour: string;
  themeTint: number;
  isActive: boolean;
  tabIndex: number;
  numOfTabs: number;
  onClick: () => void;
  themeFont: ThemeFonts;
}
const Tab: FC<Props> = ({
  children,
  tabIndex,
  numOfTabs,
  isActive,
  onClick,
  themeFont,
  themeColour,
  themeTint,
}) => {
  return (
    <Button
      themeColour={themeColour}
      themeTint={themeTint}
      onClick={onClick}
      className={buildTabStyles(isActive, tabIndex, numOfTabs)}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={`font-${themeFont} ${isActive && `font-bold`}`}>{children}</span>
      <span aria-hidden="true" className={buildTabTextStyles(isActive, themeColour, themeTint)} />
    </Button>
  );
};

export { Tab };
