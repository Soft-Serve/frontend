import React, { Fragment } from "react";
import type { FC } from "react";
import { SignInForm } from "@presentational";
import { BoxSection, Container, Notification } from "@base";
import { MenuPage } from "../MenuPage";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { FullLogoSVG } from "src/svgs";

const SignInPage: FC = () => {
  const flash = () => (
    <Notification header="Account verified!" subHeader="You can now sign in to your account" />
  );

  const accountConfirmed = () => window.location.search === "?account_confirmation_success=true";

  return (
    <>
      <header>
        <Popover className="relative bg-red-400">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-2 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="sr-only">Soft Serve Logo</span>
                <FullLogoSVG className="w-20 fill-current stroke-current text-white" />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/sign-up"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-white origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-red-400 hover:bg-red-400 hover:text-white font-Quicksand  font-bold"
              >
                Sign up
              </Link>
              <Link
                to="/"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-white origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-red-400 hover:bg-red-400 hover:text-white font-Quicksand  font-bold"
              >
                Home
              </Link>
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-900">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="mt-6">
                    <Link
                      to="/"
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-white origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-red-400 hover:bg-red-400 hover:text-white font-Quicksand  font-bold"
                    >
                      Home
                    </Link>
                    <Link
                      to="/sign-up"
                      className="w-full flex items-center justify-center bg-red-400 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white hover:from-red-700 hover:to-red-700 font-Quicksand font-bold"
                    >
                      Sign up
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-900 font-Quicksand">
                      Existing customer?
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>
      <MenuPage>
        {accountConfirmed() && flash()}
        <Container>
          <BoxSection>
            <SignInForm themeTint={400} themeColour="red" />
          </BoxSection>
        </Container>
      </MenuPage>
    </>
  );
};

export { SignInPage };
