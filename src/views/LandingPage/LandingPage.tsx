import React, { Fragment } from "react";
import type { FC } from "react";
import {
  AnnotationIcon,
  ChatAlt2Icon,
  ChatAltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentReportIcon,
  HeartIcon,
  InboxIcon,
  MenuIcon,
  PencilAltIcon,
  QuestionMarkCircleIcon,
  ReplyIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { FacebookSVG, FullLogoSVG, InstagramSVG, TwitterSVG } from "@svgs";
import DestopImage from "./desktop.png";
import settingsImage from "./settings.png";
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
  "Private forum access",
  "Member resources",
  "Entry to annual conference",
  "Official member t-shirt",
];

const features = [
  {
    name: "Custom menus",
    description:
      "Choose your brand colour, banner, logo and font. Build menus with or without photos.",
    icon: InboxIcon,
  },
  {
    name: "Mark items as unavailable",
    description:
      "When a dish sells out 86 it in real time, instantly updating the menu for guests.",
    icon: UsersIcon,
  },
  {
    name: "Allergy filters",
    description: "Make ordering easier for guests with allergies by using our dietary filters.",
    icon: TrashIcon,
  },
  {
    name: "QR code",
    description: "Access the menu with a QR for a safe and contact free experience",
    icon: PencilAltIcon,
  },
  {
    name: "Unlimited menus",
    description: "Create separate menus for each service.",
    icon: DocumentReportIcon,
  },
  {
    name: "Customer service",
    description:
      "We pride ourselves on providing quality customer service. Contact us by phone or email and we'll be there to assist.",
    icon: ReplyIcon,
  },
  {
    name: "Easy onboarding",
    description:
      "Don't spend hours adding menu items manually. Add them to our excel spreadsheet and we will them for you within 24 hours.",
    icon: ChatAltIcon,
  },
  {
    name: "Quickly create, update and delete menus",
    description:
      "Easily manage menus from any device. We make it quick and easy to modify menus on the fly.",
    icon: HeartIcon,
  },
];

const solutions = [
  {
    name: "Inbox",
    description: "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Messaging",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: AnnotationIcon,
  },
  {
    name: "Live Chat",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ChatAlt2Icon,
  },
  {
    name: "Knowledge Base",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: QuestionMarkCircleIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const LandingPage: FC = () => {
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
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-900">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10 items-center">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-900",
                        "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 px-2 py-2"
                      )}
                    >
                      <span className="text-red-400 group-hover:text-red-400 font-Quicksand font-bold">
                        Features
                      </span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-red-400",
                          "ml-2 h-5 w-5 group-hover:text-red-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                            {solutions.map(item => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-red-600 to-red-600 text-white sm:h-12 sm:w-12">
                                  <item.icon className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-900">{item.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <a
                href="/"
                className="text-base font-bold text-white hover:text-red-400 hover:bg-white rounded-md  px-4 py-2 font-Quicksand "
              >
                Pricing
              </a>
              <a
                href="/"
                className="text-base font-bold text-white hover:text-red-400 hover:bg-white rounded-md  px-4 py-2 font-Quicksand "
              >
                Partners
              </a>
              <a
                href="/"
                className="text-base font-bold text-white hover:text-red-400 hover:bg-white rounded-md  px-4 py-2 font-Quicksand "
              >
                Company
              </a>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/sign-in"
                className="whitespace-nowrap text-base font-bold px-4 py-2  text-white rounded-md hover:text-red-400 hover:bg-white"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-white origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-red-400 hover:bg-red-400 hover:text-white font-Quicksand  font-bold"
              >
                Sign up
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
                  <div className="mt-6">
                    <nav className="grid grid-cols-1 gap-7">
                      {solutions.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-red-400 text-white">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">
                            {item.name}
                          </div>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="/"
                      className="text-base font-medium text-gray-900 hover:text-gray-700 font-Quicksand"
                    >
                      Pricing
                    </a>
                    <a
                      href="/"
                      className="text-base font-medium text-gray-900 hover:text-gray-700 font-Quicksand"
                    >
                      Partners
                    </a>
                    <a
                      href="/"
                      className="text-base font-medium text-gray-900 hover:text-gray-700 font-Quicksand"
                    >
                      Company
                    </a>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/sign-up"
                      className="w-full flex items-center justify-center bg-red-400 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base text-white hover:from-red-700 hover:to-red-700 font-Quicksand font-bold"
                    >
                      Sign up
                    </Link>
                    <p className="mt-6 text-center text-base font-medium text-gray-900 font-Quicksand">
                      Existing customer?
                      <Link to="/sign-in" className="text-gray-900">
                        Sign in
                      </Link>
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
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src={computer}
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white font-Quicksand">modern software</span>
                  <span className="block text-red-200 font-Quicksand">
                    for the service industry
                  </span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl font-Quicksand">
                  Our virtual menu is completely customizable to encapsulate the look and feel of
                  your restaurant brand.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <Link
                      to="/sign-up"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base rounded-md shadow-sm text-red-400 bg-white hover:bg-indigo-50 sm:px-8 font-Quicksand font-bold"
                    >
                      Start free trial
                    </Link>
                    <Link
                      to="/restaurants/cafemonty"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base rounded-md shadow-sm text-white bg-red-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8 font-Quicksand font-bold"
                    >
                      Live demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative pt-16 pb-32 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-white" />
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-red-400">
                      <PencilAltIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-Quicksand">
                      Manage your menu from any device
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 font-Quicksand">
                      Customize your brand colour, logo, banner and font. Create new menus with or
                      without images and update dishes in real time.
                    </p>
                    <div className="mt-6">
                      <a
                        href="/"
                        className="inline-flex bg-red-400 bg-origin-border px-4 py-2 border border-transparent text-base font-bold rounded-md shadow-sm text-white hover:from-red-700 hover:to-red-700 font-Quicksand"
                      >
                        Start free trial
                      </a>
                    </div>
                  </div>
                </div>
                {/* <div className="mt-8 border-t border-gray-200 pt-6">
                  <blockquote>
                    <div>
                      <p className="text-base text-gray-500 font-Quicksand italic">
                        &ldquo;Cras velit quis eros eget rhoncus lacus ultrices sed diam. Sit orci
                        risus aenean curabitur donec aliquet. Mi venenatis in euismod ut.&rdquo;
                      </p>
                    </div>
                    <footer className="mt-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-6 w-6 rounded-full"
                            src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                            alt=""
                          />
                        </div>
                        <div className="text-base font-bold text-gray-700 font-Quicksand">
                          Marcia Hill, Digital Marketing Manager
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div> */}
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src={settingsImage}
                    alt="Inbox user interface"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24 bg-red-400 py-8">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-white">
                      <SparklesIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-bold tracking-tight text-white font-Quicksand">
                      Built by hospitality professionals
                    </h2>
                    <p className="mt-4 text-lg text-white">
                      Our team has over over 15 years experience working in the hospitality
                      industry. We understand your needs and are here to make your job easier. We'd
                      love to chat so if you have questions don't hestitate to reach out to our
                      team!
                    </p>
                    <div className="mt-6">
                      <a
                        href="/"
                        className="inline-flex bg-white bg-origin-border px-4 py-2 border border-transparent text-base rounded-md shadow-sm text-red-400 font-Quicksand font-bold"
                      >
                        Contact team
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                    src={DestopImage}
                    alt="Customer profile user interface"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="from-red-400 to-red-600 bg-gradient-to-b">
            <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-Quicksand">
                30 Day free trial with no commitment
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-red-200 font-Quicksand">
                All of our features are available with your free trial. Try it our risk free and let
                us know what you think.
              </p>
              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                {features.map(feature => (
                  <div key={feature.name}>
                    <div>
                      <span className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-white font-Quicksand">
                        {feature.name}
                      </h3>
                      <p className="mt-2 text-base text-red-200 font-Quicksand">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-100">
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl font-Quicksand">
                    Simple no-tricks pricing
                  </h2>
                  <p className="mt-4 text-xl text-gray-600 font-Quicksand">
                    If you're not satisfied, contact us within the first 14 days and we'll send you
                    a full refund.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
              <div className="relative">
                <div className="absolute inset-0 h-1/2 bg-gray-100" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                    <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                      <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl font-Quicksand">
                        Lifetime Membership
                      </h3>
                      <p className="mt-6 text-base text-gray-500 font-Quicksand">
                        Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis
                        perferendis blanditiis repellendus etur quidem assumenda.
                      </p>
                      <div className="mt-8">
                        <div className="flex items-center">
                          <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-bold uppercase text-red-400 font-Quicksand">
                            What's included
                          </h4>
                          <div className="flex-1 border-t-2 border-gray-200" />
                        </div>
                        <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                          {includedFeatures.map(feature => (
                            <li key={feature} className="flex items-start lg:col-span-1">
                              <div className="flex-shrink-0">
                                <CheckCircleIcon
                                  className="h-5 w-5 text-green-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-sm text-gray-700 font-Quicksand">{feature}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                      <p className="text-lg leading-6 font-bold text-gray-900 font-Quicksand">
                        Pay once, own it forever
                      </p>
                      <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 font-Quicksand">
                        <span>$349</span>
                        <span className="ml-3 text-xl font-medium text-gray-500 font-Quicksand">
                          USD
                        </span>
                      </div>
                      <p className="mt-4 text-sm">
                        <a href="/" className="font-medium text-gray-500 underline font-Quicksand">
                          Learn about our membership policy
                        </a>
                      </p>
                      <div className="mt-6">
                        <div className="rounded-md shadow">
                          <a
                            href="/"
                            className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 font-Quicksand"
                          >
                            Get Access
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
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            {navigation.social.map(item => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon
                  className="h-6 w-6 text-white hover:text-red-400 hover:bg-white rounded-md"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-white font-Quicksand">
            &copy; 2022 Soft Serve, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export { LandingPage };
