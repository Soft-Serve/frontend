import React, { Fragment } from "react";
import type { FC } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

interface Props {
  themeColour: string;
  themeTint: number;
}
const KebabDropdown: FC<Props> = ({ children, themeTint, themeColour }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`bg-white  flex items-center p-2 text-gray-900 hover:text-white hover:bg-${themeColour}-${themeTint} rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-${themeColour}-${themeTint}`}
        >
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className={`py-2 px-2 bg-${themeColour}-${themeTint} rounded-md`}>{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { KebabDropdown };
