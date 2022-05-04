import React, { Fragment, useState } from "react";
import type { FC } from "react";
import {
  PhoneIcon,
  QrcodeIcon,
  CheckCircleIcon,
  MenuIcon,
  PencilAltIcon,
  XCircleIcon,
  EmojiHappyIcon,
  DeviceMobileIcon,
  FilterIcon,
  CogIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { FacebookSVG, FullLogoSVG, InstagramSVG, TwitterSVG } from "@svgs";
import DesktopImage from "./desktop.png";
import menuImage from "./menu_image.png";
import bellaCiaoSettings from "./bella_ciao_settings.png";
import cafeMontySettings from "./cafe_monty_settings.png";
import computer from "./computer.png";

const navigation = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: FacebookSVG,
    },
    {
      name: "Instagram",
      href: "#",
      icon: InstagramSVG,
    },
    {
      name: "Twitter",
      href: "#",
      icon: TwitterSVG,
    },
  ],
};

const includedFeatures = [
  "Unlimited menus",
  "Custom colour and fonts",
  "Initial menu upload",
  "Personalized customer service",
];

const features = [
  {
    name: "Mark items as unavailable",
    description:
      "When a dish sells out 86 it in real time, instantly updating the menu for guests.",
    icon: XCircleIcon,
  },
  {
    name: "Filter by allergies",
    description: "Make ordering easier for servers and guests with our dietary filters.",
    icon: FilterIcon,
  },
  {
    name: "QR code",
    description: "Access the menu with a QR code for a safe and contact free experience",
    icon: QrcodeIcon,
  },
  {
    name: "Customer service",
    description:
      "We pride ourselves on providing quality customer service. Contact us by phone or email and we'll be there to assist.",
    icon: PhoneIcon,
  },
  {
    name: "Easy onboarding",
    description:
      "Don't spend hours adding menu items manually. Add them to our excel spreadsheet and we will upload them for you within 24 hours.",
    icon: EmojiHappyIcon,
  },
  {
    name: "User friendly settings",
    description:
      "Easily manage menus from any device. We make it quick and easy to modify menus on the fly.",
    icon: CogIcon,
  },
];

const LandingPage: FC = () => {
  const [isMonthly, setIsMonthly] = useState(true);
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
            <Popover.Group as="nav" className="hidden items-center space-x-10 md:flex">
              <a
                href="#features"
                className="rounded-md px-4 py-2 font-Quicksand text-base font-bold  text-white hover:bg-white hover:text-red-400 "
              >
                Features
              </a>
              <a
                href="#pricing"
                className="rounded-md px-4 py-2 font-Quicksand text-base font-bold  text-white hover:bg-white hover:text-red-400 "
              >
                Pricing
              </a>
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Link
                to="/sign-up"
                className="origin-border ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-4 py-2 font-Quicksand text-base  font-bold text-red-400 shadow-sm hover:bg-red-400  hover:text-white"
              >
                Sign up
              </Link>
              <Link
                to="/sign-in"
                className="origin-border ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-4 py-2 font-Quicksand text-base  font-bold text-red-400 shadow-sm hover:bg-red-400  hover:text-white"
              >
                Sign in
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
      <main>
        {/* Hero section */}
        <div className="relative w-full sm:mt-8">
          <div className="absolute inset-x-0 bottom-0 h-1/2 w-full" />
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src={computer}
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-900 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block font-Quicksand text-white">modern software</span>
                  <span className="block font-Quicksand text-red-200">
                    for the service industry
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center  font-Quicksand text-xl text-red-200 sm:max-w-3xl">
                  Our virtual menu is completely customizable to encapsulate the look and feel of
                  your restaurant brand.
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/sign-up"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:bg-indigo-50 sm:px-8"
                    >
                      Start free trial
                    </Link>
                    <Link
                      to="/restaurants/cafemonty"
                      className="flex items-center justify-center rounded-md border border-transparent bg-red-500 bg-opacity-60 px-4 py-3 font-Quicksand text-base font-bold text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                    >
                      Live demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-white" />
          <div className="relative py-28">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-red-400">
                      <DeviceMobileIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="font-Quicksand text-3xl font-extrabold tracking-tight text-gray-900">
                      Manage your menu from any device
                    </h2>
                    <p className="mt-4 font-Quicksand text-lg text-gray-500">
                      Quick menu changes during service have never been easier. Add, update or
                      delete menus and dishes on the fly from any computer, phone or tablet.
                    </p>
                    <div className="mt-6">
                      <a
                        href="/"
                        className="inline-flex rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm hover:from-red-700 hover:to-red-700"
                      >
                        Start free trial
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="flex flex-wrap justify-around">
                  <img className="max-h-96 p-2" src={bellaCiaoSettings} alt="Tablet settings" />
                  <img className="max-h-96 p-2" src={cafeMontySettings} alt="Phone settings" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-red-400 py-28 ">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mt-12 flex justify-center sm:mt-16 lg:mt-0">
                <img className="max-h-96 p-2" src={menuImage} alt="Sample menu" />
              </div>
              <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white">
                      <PencilAltIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="font-Quicksand text-3xl font-extrabold tracking-tight text-white">
                      Create bespoke menus
                    </h2>
                    <p className="mt-4 font-Quicksand text-lg text-white">
                      With a custom logo, banner, font, colours & images every Soft Serve menu is
                      completely unique.
                    </p>
                    <div className="mt-6">
                      <a
                        href="/"
                        className="inline-flex rounded-md border border-transparent bg-white bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:from-red-700 hover:to-red-700"
                      >
                        Start free trial
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-28 py-8">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
                <div>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-red-400">
                      <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="font-Quicksand text-3xl font-bold tracking-tight text-gray-900">
                      Built by hospitality professionals
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Our team has over over 15 years experience working in the hospitality
                      industry. We understand your needs and are here to make your job easier. We'd
                      love to chat so if you have questions don't hestitate to reach out to our
                      team!
                    </p>
                    <div className="mt-6">
                      <a
                        href="/"
                        className="inline-flex rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm"
                      >
                        Get in touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
                <div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                    src={DesktopImage}
                    alt="Customer profile user interface"
                  />
                </div>
              </div>
            </div>
          </div>
          <div id="features" className="bg-gradient-to-b from-red-400 to-red-600">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
              <h2 className="font-Quicksand text-3xl font-extrabold tracking-tight text-white">
                A taste of what we have to offer
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                {features.map(feature => (
                  <div key={feature.name}>
                    <div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white bg-opacity-10">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-Quicksand text-lg font-bold text-white">
                        {feature.name}
                      </h3>
                      <p className="mt-2 font-Quicksand text-base text-red-200">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="pricing" className="bg-gray-100">
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="font-Quicksand text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                    30 day free trial with no commitment
                  </h2>
                  <p className="mt-4 font-Quicksand text-xl text-gray-600">
                    No credit card information required. Try Soft Serve risk free and see how it
                    facilitates a seamless customer experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
              <div className="relative">
                <div className="absolute inset-0 h-1/2 bg-gray-100" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
                    <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                      <h3 className="font-Quicksand text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Simple no-tricks pricing
                      </h3>
                      <div className="mt-8">
                        <div className="flex items-center">
                          <h4 className="flex-shrink-0 bg-white pr-4 font-Quicksand text-sm font-bold uppercase tracking-wider text-red-400">
                            What's included
                          </h4>
                          <div className="flex-1 border-t-2 border-gray-200" />
                        </div>
                        <ul className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0">
                          {includedFeatures.map(feature => (
                            <li key={feature} className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <CheckCircleIcon
                                  className="h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 font-Quicksand text-sm text-gray-700">{feature}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                      <p className="font-Quicksand text-lg font-bold leading-6 text-gray-900">
                        Save 10% with yearly billing!
                      </p>
                      <div className="relative mt-4 flex self-center rounded-lg bg-gray-100">
                        <button
                          type="button"
                          onClick={() => setIsMonthly(true)}
                          className="relative w-1/2 whitespace-nowrap rounded-md border-gray-200 bg-white py-2 text-sm font-medium text-gray-900 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-auto sm:px-8"
                        >
                          Monthly billing
                        </button>
                        <button
                          type="button"
                          className="relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-auto sm:px-8"
                          onClick={() => setIsMonthly(false)}
                        >
                          Yearly billing
                        </button>
                      </div>
                      {isMonthly && (
                        <div className="mt-8 flex items-center justify-center font-Quicksand text-5xl font-extrabold text-gray-900">
                          <span>$20</span>
                          <span className="ml-3 font-Quicksand text-xl font-medium text-gray-500">
                            CAD /month
                          </span>
                        </div>
                      )}
                      {!isMonthly && (
                        <div className="mt-8 flex items-center justify-center font-Quicksand text-5xl font-extrabold text-gray-900">
                          <span>$216</span>
                          <span className="ml-3 font-Quicksand text-xl font-medium text-gray-500">
                            CAD /year
                          </span>
                        </div>
                      )}
                      <div className="mt-8">
                        <div className="rounded-md shadow">
                          <a
                            href="/"
                            className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-3 font-Quicksand text-base font-medium text-white hover:bg-gray-900"
                          >
                            Start free trial
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-red-400">
        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            {navigation.social.map(item => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon
                  className="h-6 w-6 rounded-md text-white hover:bg-white hover:text-red-400"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export { LandingPage };
