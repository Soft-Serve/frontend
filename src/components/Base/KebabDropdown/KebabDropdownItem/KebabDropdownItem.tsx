import React from "react";
import type { FC } from "react";
import { Menu } from "@headlessui/react";
import { classnames, TArg } from "tailwindcss-classnames";
import { activeStyles, nonActiveStyles } from "./styles";

interface Props {
  onClick?: any;
  themeColour: string;
  themeTint: number;
  children: React.ReactNode;
}

const KebabDropdownItem: FC<Props> = ({ children, onClick, themeColour, themeTint }) => {
  const aciveFontColor = `text-${themeColour}-${themeTint}` as TArg;

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`font-Quicksand text-sm font-bold text-${themeColour}-${themeTint} my-1 rounded-md border-2 border-white ${classnames(
            active ? activeStyles(aciveFontColor) : nonActiveStyles
          )}`}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

export { KebabDropdownItem };
