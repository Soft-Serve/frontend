import React, { Fragment, useEffect, useState } from "react";
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
  MailIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import { LinkedInSVG, FullLogoSVG, InstagramSVG, TwitterSVG } from "@svgs";
import DesktopImage from "./desktop.png";
import bellaCiaoImage from "./bella_ciao_menu.png";
import cafeMontyImage from "./cafe_monty_menu.png";
import computer from "./computer.png";
import { routes } from "src/routes";
import { Button, Grid, Modal } from "@base";
import { DocumentIcon, PhotographIcon } from "@heroicons/react/solid";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const SERVICE_ID = "service_yldn2lp";
const TEMPLATE_ID = "template_7py28lg";
const USER_ID = "BJWROl4p5lSbIMH7W";

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
      name: "Linkedin",
      href: "https://www.linkedin.com/company/softserveapp/",
      icon: LinkedInSVG,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/softserveapp/",
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
    description:
      "Dietary restrictions can make eating out a challenge. Make it easy for guests with our dietary filters.",
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
    description: "Send us your menu, we'll do the rest.",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);

  const [message, setMessage] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMessage(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      result => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      error => {
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    e.target.reset();
    setMessage({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  useEffect(() => () => setIsModalOpen(false), []);
  return (
    <>
      <Modal onClose={setIsModalOpen} isOpen={isModalOpen}>
        <Grid size="M">
          <Link to="/restaurants/cafemonty">
            <Button size="XL" themeColour="red" themeTint={600}>
              Demo with images
              <PhotographIcon className="ml-2 h-6 w-6" aria-hidden="true" />
            </Button>
          </Link>
          <Link to="/restaurants/bellaciao">
            <Button size="XL" themeColour="red" themeTint={600}>
              Demo without images
              <DocumentIcon className="ml-2 h-6 w-6" aria-hidden="true" />
            </Button>
          </Link>
        </Grid>
      </Modal>
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
              <Popover.Group as="nav" className="hidden items-center space-x-5 md:flex">
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
              <div className="divide-y-2 divide-red-400 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <FullLogoSVG className="w-20 fill-current stroke-current text-red-400" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-red-400 p-2 text-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <Link
                    to="/sign-up"
                    className="mb-4 flex w-full items-center justify-center rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm hover:from-red-700 hover:to-red-700"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/sign-in"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm hover:from-red-700 hover:to-red-700"
                  >
                    Sign in
                  </Link>
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
                  <span className="block font-Quicksand text-white">our menu,</span>
                  <span className="block font-Quicksand text-red-200">your restaurant's brand</span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center  font-Quicksand text-xl text-red-200 sm:max-w-3xl">
                  modern software for the service industry.
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to={routes.signUp}
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:bg-indigo-50 sm:px-8"
                    >
                      Start free trial
                    </Link>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      themeColour="red"
                      themeTint={400}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-500 bg-opacity-60 px-4 py-3 font-Quicksand text-base font-bold text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                    >
                      Live demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-white" />
          <div className="relative py-28">
            <div className="xl:mx-auto xl:grid xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-24 xl:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 xl:col-start-2 xl:mx-0 xl:max-w-none xl:py-32 xl:px-0">
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
                    <p className="mt-4 font-Quicksand text-xl text-gray-500">
                      Quick menu changes during service have never been easier. Add, update or
                      delete menus and dishes on the fly from any computer, phone or tablet.
                    </p>
                    <div className="mt-6">
                      <a
                        href={routes.signUp}
                        className="inline-flex rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm hover:from-red-700 hover:to-red-700"
                      >
                        Start free trial
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 xl:mt-0">
                <div className="flex flex-wrap justify-around px-10">
                  <video loop autoPlay muted playsInline className="max-h-[32rem] rounded-3xl">
                    <source
                      src="https://res.cloudinary.com/softserve/video/upload/v1653164402/settings_katuhz.mov"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-red-400 py-28 ">
            <div className="xl:mx-auto xl:grid xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-24 xl:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 xl:mx-0 xl:max-w-none xl:py-16 xl:px-0">
                <div>
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white">
                      <PencilAltIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="font-Quicksand text-3xl font-extrabold tracking-tight text-white">
                      Create unique menus
                    </h2>
                    <p className="mt-4 font-Quicksand text-xl text-white">
                      With a custom colour, logo, banner and font, no 2 SoftServe menus look the
                      same.
                    </p>
                    <div className="mt-6">
                      <Link
                        to={routes.signUp}
                        className="inline-flex rounded-md border border-transparent bg-white bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:from-red-700 hover:to-red-700"
                      >
                        Start free trial
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex flex-wrap justify-center sm:mt-16 xl:mt-0">
                <img
                  className="max-h-[32rem] p-2"
                  src={bellaCiaoImage}
                  style={{ borderRadius: "2.5rem" }}
                  alt="Sample menu 1"
                />
                <img
                  className="max-h-[32rem] p-2"
                  src={cafeMontyImage}
                  style={{ borderRadius: "2.5rem" }}
                  alt="Sample menu 2"
                />
              </div>
            </div>
          </div>
          <div className="my-28 py-8">
            <div className="xl:mx-auto xl:grid xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-24 xl:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 xl:col-start-2 xl:mx-0 xl:max-w-none xl:py-32 xl:px-0">
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
                    <p className="mt-4 text-xl text-gray-500">
                      Our team has over over 15 years experience working in the hospitality
                      industry. We understand your needs and are here to make your job easier. We'd
                      love to chat so if you have questions don't hestitate to reach out to our
                      team!
                    </p>
                    <div className="mt-6">
                      <a
                        href={routes.signUp}
                        className="inline-flex rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm"
                      >
                        Start free trial
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 xl:col-start-1 xl:mt-0">
                <div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 xl:relative xl:m-0 xl:h-full xl:px-0">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 xl:absolute xl:right-0 xl:h-full xl:w-auto xl:max-w-none"
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
                    No credit card information required. Try SoftServe risk free and see how it
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
                        Transparent pricing
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
                          <span>$30</span>
                          <span className="ml-3 font-Quicksand text-xl font-medium text-gray-500">
                            CAD /month
                          </span>
                        </div>
                      )}
                      {!isMonthly && (
                        <div className="mt-8 flex items-center justify-center font-Quicksand text-5xl font-extrabold text-gray-900">
                          <span>$324</span>
                          <span className="ml-3 font-Quicksand text-xl font-medium text-gray-500">
                            CAD /year
                          </span>
                        </div>
                      )}
                      <div className="mt-8">
                        <div className="rounded-md shadow">
                          <Link
                            to={routes.signUp}
                            className="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-3 font-Quicksand text-base font-medium text-white hover:bg-gray-900"
                          >
                            Start free trial
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-white">
          <div className="absolute inset-0">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
          </div>
          <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
              <div className="mx-auto max-w-lg">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Get in touch
                </h2>

                <dl className="mt-8 text-base text-gray-500">
                  <div className="mt-6">
                    <dt className="sr-only">Phone number</dt>
                    <dd className="flex">
                      <PhoneIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">+1 (437) 324-0189</span>
                    </dd>
                  </div>
                  <div className="mt-3">
                    <dt className="sr-only">Email</dt>
                    <dd className="flex">
                      <MailIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-3">support@softserveapp.com</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
              <div className="mx-auto max-w-lg lg:max-w-none">
                <form onSubmit={handleOnSubmit} className="grid grid-cols-1 gap-y-6">
                  <div>
                    <label htmlFor="full-name" className="sr-only">
                      Full name
                    </label>
                    <input
                      // value={message.name}
                      type="text"
                      name="name"
                      onChange={handleChange}
                      id="name"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-red-500 focus:ring-red-500"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      value={message.email}
                      id="email"
                      name="email"
                      onChange={handleChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-red-500 focus:ring-red-500"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      value={message.phone}
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      id="phone"
                      autoComplete="tel"
                      className="focus:red-indigo-500 block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-red-500"
                      placeholder="Phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      value={message.message}
                      id="message"
                      onChange={handleChange}
                      name="message"
                      rows={4}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-red-500 focus:ring-red-500"
                      placeholder="Message"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
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
