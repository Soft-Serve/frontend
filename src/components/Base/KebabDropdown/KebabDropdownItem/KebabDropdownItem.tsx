import React from "react";
import type { FC } from "react";
import { Menu } from "@headlessui/react";
import { classnames, TArg } from "tailwindcss-classnames";
import { useRestaurantContext } from "src/contexts";

interface Props {
  onClick?: any;
}

const KebabDropdownItem: FC<Props> = ({ children, onClick }) => {
  const { themeColour, themeTint } = useRestaurantContext();
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
  const nonActiveStyles = classnames("p-2", "w-full", "text-left");

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`font-Quicksand font-bold text-sm text-white border-2 border-white rounded-md my-1 ${classnames(
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