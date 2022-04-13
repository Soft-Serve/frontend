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
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="sr-only">Soft Serve Logo</span>
                <FullLogoSVG className="w-20 fill-current stroke-current text-white" />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Link
                to="/sign-up"
                className="origin-border ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-4 py-2 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:bg-red-400  hover:text-white"
              >
                Sign up
              </Link>
              <Link
                to="/"
                className="origin-border ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-4 py-2 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:bg-red-400  hover:text-white"
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
              className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
            >
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-purple-600-to-indigo-600.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-900">
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
                      className="origin-border ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-4 py-2 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:bg-red-400  hover:text-white"
                    >
                      Home
                    </Link>
                    <Link
                      to="/sign-up"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm hover:from-red-700 hover:to-red-700"
                    >
                      Sign up
                    </Link>
                    <p className="mt-6 text-center font-Quicksand text-base font-medium text-gray-900">
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
