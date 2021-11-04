import React from "react";
import type { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { classnames, TArg } from "tailwindcss-classnames";
import { useGlobalContext } from "@contexts";
import { generateThemeColours } from "src/utility";
import { base, button } from "./styles";

type To = NavLinkProps["to"];

interface Props {
  to?: To;
  onClick?: () => void;
  css?: TArg;
}

const NavigationItem: FC<Props> = ({ children, to, onClick, css }) => {
  const { themeColour, themeTint } = useGlobalContext();

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
