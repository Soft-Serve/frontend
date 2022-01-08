import React, { Fragment } from "react";
import type { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SettingsSubMenu } from "src/components/Presentational";
import { XIcon } from "@heroicons/react/solid";
import { Button } from "@base";

interface Props {
  isOpen: boolean;
  onClose: any;
  selected: string;
  setSelected: any;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const SettingsMobileSubNavigation: FC<Props> = ({
  isOpen,
  onClose,
  selected,
  setSelected,
  themeColour,
  themeTint,
  restaurantSlug,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 lg:hidden"
        open={isOpen}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-blue-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 pt-4 mr-4">
                <Button
                  themeColour={themeColour}
                  themeTint={themeTint}
                  onClick={() => onClose(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </Button>
              </div>
            </Transition.Child>
            <SettingsSubMenu
              restaurantSlug={restaurantSlug}
              themeColour={themeColour}
              themeTint={themeTint}
              selected={selected}
              setSelected={setSelected}
              className="flex-shrink-0 w-full bg-white border-r border-blue-gray-200 flex flex-col"
            />
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true" />
      </Dialog>
    </Transition.Root>
  );
};

export { SettingsMobileSubNavigation };
