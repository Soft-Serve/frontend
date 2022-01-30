import React from "react";
import type { FC } from "react";
import { Menu } from "@headlessui/react";
import { classnames, TArg } from "tailwindcss-classnames";

interface Props {
  onClick?: any;
  themeColour: string;
  themeTint: number;
}

const KebabDropdownItem: FC<Props> = ({ children, onClick, themeColour, themeTint }) => {
  const aciveFontColor = `text-${themeColour}-${themeTint}` as TArg;
  const activeStyles = classnames(
    "bg-white",
    "w-full",
    "p-2",
    "w-full",
    "text-left",
    "rounded-md",
    aciveFontColor
  );
  const nonActiveStyles = classnames("p-2", "w-full", "text-left", "text-white");

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`font-Quicksand text-sm font-bold text-${themeColour}-${themeTint} my-1 rounded-md border-2 border-white ${classnames(
            active ? activeStyles : nonActiveStyles
          )}`}
        >
          {children}
        </button>
      )}
    </Menu.Item>
  );
};

export { KebabDropdownItem };
