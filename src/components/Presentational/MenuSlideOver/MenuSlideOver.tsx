import React, { Dispatch, Fragment, SetStateAction } from "react";
import type { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { MenusMobileNavigation, RestaurantLogo } from "@presentational";
import { Button } from "@base";

interface Props {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  themeColour: string;
  themeTint: number;
  themeFont: string;
  restaurantSlug: string;
}

const MenuSlideOver: FC<Props> = ({
  isOpen,
  onClose,
  themeColour,
  themeTint,
  themeFont,
  restaurantSlug,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 flex z-40" open={isOpen} onClose={onClose}>
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
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl rounded-r-md focus:outline-none">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 mr-2 pt-4">
                <Button
                  themeColour={themeColour}
                  themeTint={themeTint}
                  onClick={() => onClose(prevState => !prevState)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </Button>
              </div>
            </Transition.Child>
            <div className="pt-5 pb-4 h-full">
              <div className="flex-shrink-0 flex items-center px-4">
                <RestaurantLogo
                  restaurantSlug={restaurantSlug}
                  dimensions={60}
                  borderColor="black"
                  borderWidth={1}
                />
              </div>
              <nav aria-label="Sidebar" className="mt-5">
                <MenusMobileNavigation
                  restaurantSlug={restaurantSlug}
                  themeFont={themeFont}
                  themeColour={themeColour}
                  themeTint={themeTint}
                  closeMenu={onClose}
                />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true" />
      </Dialog>
    </Transition.Root>
  );
};

export { MenuSlideOver };
