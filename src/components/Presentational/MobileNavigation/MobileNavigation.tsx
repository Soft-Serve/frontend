import React, { Fragment } from "react";
import type { FC } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RestaurantLogo } from "@presentational";
import { XIcon } from "@heroicons/react/solid";
import { Button } from "@base";
import { Link } from "react-router-dom";
import { routes } from "src/routes";

interface Props {
  isOpen: boolean;
  onClose: any;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
  children: React.ReactNode;
}
const MobileNavigation: FC<Props> = ({
  isOpen,
  onClose,
  children,
  themeTint,
  themeColour,
  restaurantSlug,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-50 flex lg:hidden"
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
          <Dialog.Overlay className="bg-blue-gray-600 fixed inset-0 bg-opacity-75" />
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
          <div
            className={`relative flex w-full max-w-xs flex-1 flex-col bg-${themeColour}-${themeTint} focus:outline-none`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 mr-4 pt-4">
                <Button
                  themeColour={themeColour}
                  themeTint={themeTint}
                  colour="accent"
                  onClick={() => onClose(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
            </Transition.Child>
            <div className="h-full">
              <Link to={`${routes.restaurants}/${restaurantSlug}`}>
                <div
                  className={`flex flex-shrink-0 items-center px-4 bg-${themeColour}-${themeTint} pt-4 pb-4`}
                >
                  <RestaurantLogo
                    restaurantSlug={restaurantSlug}
                    dimensions={60}
                    borderColor="white"
                    borderWidth={2}
                  />
                </div>
              </Link>
              <nav aria-label="Sidebar" className="h-full">
                {children}
              </nav>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export { MobileNavigation };
