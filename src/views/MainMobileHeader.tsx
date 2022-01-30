import React, { Dispatch, Fragment, SetStateAction } from "react";
import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUserQuery, useSignOutMutation } from "@shared";
import { Button } from "@base";
import { RestaurantLogo } from "@presentational";
import { routes } from "@routes";
import { clientToken } from "@constants";
import { Menu, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  setIsFilterSideMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsMenuSlideOverOpen: Dispatch<SetStateAction<boolean>>;
  themeColour: string;
  themeTint: number;
  themeFont: string;
  restaurantSlug: string;
}

const MainMobileHeader: FC<Props> = ({
  children,
  setIsFilterSideMenuOpen,
  setIsMenuSlideOverOpen,
  restaurantSlug,
  themeTint,
  themeColour,
  themeFont,
}) => {
  const { pathname } = useLocation();
  const { data } = useCurrentUserQuery();

  const isOnSettingsPage = pathname.includes("settings");
  const hasUser = !!localStorage.getItem(clientToken);

  const renderDietaryButton = () => {
    if (isOnSettingsPage) return null;
    return (
      <Button
        themeColour={themeColour}
        themeTint={themeTint}
        size="LG"
        themeFont={themeFont}
        css="mr-2"
        colour="accent"
        onClick={() => setIsFilterSideMenuOpen(prevState => !prevState)}
      >
        Dietaries
        <span className="sr-only">Filters List</span>
      </Button>
    );
  };

  const renderSettingsButton = () => {
    if (data?.currentUser || hasUser)
      return (
        <Menu.Item>
          {({ active }) => (
            <Link
              to={`${routes.restaurants}/${restaurantSlug}/settings/restaurant`}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              Settings
            </Link>
          )}
        </Menu.Item>
      );
  };

  const renderSettingsNav = () => {
    if (!isOnSettingsPage) {
      return renderSettingsButton();
    } else {
      return (
        <Menu.Item>
          {({ active }) => (
            <Link
              to={`${routes.restaurants}/${restaurantSlug}`}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              Restaurant menu
            </Link>
          )}
        </Menu.Item>
      );
    }
  };

  const renderLogo = () => {
    if (!data?.currentUser || hasUser) {
      return <RestaurantLogo restaurantSlug={restaurantSlug} dimensions={50} />;
    }
  };

  const [signOut] = useSignOutMutation();
  const signUserOut = () => {
    localStorage.clear();
    signOut({ variables: { input: {} } });
    window.location.assign(`${routes.restaurants}/${restaurantSlug}`);
  };

  const renderSignInButton = () => {
    return (
      <Menu.Item>
        {({ active }) => (
          <Link
            to={"/sign-in"}
            className={classNames(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "block px-4 py-2 text-sm"
            )}
          >
            Sign in
          </Link>
        )}
      </Menu.Item>
    );
  };

  const renderAuthButton = () => {
    if (data?.currentUser || hasUser) {
      return (
        <Menu.Item>
          {({ active }) => (
            <div
              onClick={signUserOut}
              className={classNames(
                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                "block px-4 py-2 text-sm"
              )}
            >
              Sign out
            </div>
          )}
        </Menu.Item>
      );
    }
    return renderSignInButton();
  };

  const renderUser = () => {
    if (data?.currentUser || hasUser) {
      return (
        <div className="px-4 py-3">
          <p className="text-sm">Signed in as</p>
          <p className="truncate text-sm font-bold text-gray-900">{data?.currentUser?.email}</p>
        </div>
      );
    }
    return null;
  };

  const renderMenuButton = () => {
    if (isOnSettingsPage) {
      return null;
    }
    return (
      <Button
        themeColour={themeColour}
        themeTint={themeTint}
        size="LG"
        themeFont={themeFont}
        css="mr-2"
        colour="accent"
        onClick={() => setIsMenuSlideOverOpen(prevState => !prevState)}
      >
        Menus
        <span className="sr-only">Open Menus List</span>
      </Button>
    );
  };

  return (
    <div className={`flex min-w-0 flex-1 flex-col overflow-y-auto font-${themeFont}`}>
      <div className="lg:hidden">
        <div
          className={`bg-${themeColour}-${themeTint} flex items-center justify-between py-2 sm:px-6`}
        >
          <div className="mx-2">{renderLogo()}</div>
          <div className="ml-2 flex w-full items-center justify-end">
            {renderDietaryButton()}
            {renderMenuButton()}

            <Menu as="div" className="relative mr-2 inline-block">
              <div>
                <Menu.Button
                  className={`inline-flex w-full justify-center rounded-md border-2 px-4 py-2 shadow-sm bg-${themeColour}-${themeTint} text-sm font-medium text-gray-700  focus:outline-none focus:ring-2`}
                >
                  <MenuIcon className={`h-5 w-5 text-white`} />
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
                <Menu.Items
                  className={`absolute right-0 z-50 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none `}
                >
                  {renderUser()}
                  <div className="py-1">{renderSettingsNav()}</div>
                  <div className="py-1">{renderAuthButton()}</div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export { MainMobileHeader };
