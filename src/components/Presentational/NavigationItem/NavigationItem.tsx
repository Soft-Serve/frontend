import React from "react";
import type { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { classnames, TArg } from "tailwindcss-classnames";
import { generateThemeColours } from "@utility";
import { base, button } from "./styles";

type To = NavLinkProps["to"];

interface Props {
  themeColour: string;
  themeTint: number;
  to?: To;
  onClick?: () => void;
  css?: TArg;
  children: React.ReactNode;
}

const NavigationItem: FC<Props> = ({ children, to, onClick, css, themeTint, themeColour }) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={classnames(button, base, css, generateThemeColours(themeColour, themeTint))}
      >
        {children}
      </button>
    );
  }
  if (to) {
    return (
      <NavLink
        to={to}
        className={classnames(base, css, generateThemeColours(themeColour, themeTint))}
      >
        {children}
      </NavLink>
    );
  }
  return null;
};

export { NavigationItem };
