import React, { ChangeEvent, Dispatch, FormEvent, Fragment, SetStateAction, useState } from "react";
import type { FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  isNameValid,
  isNameOnlyNumbers,
  isEmailAtValid,
  isEmailDotValid,
  isBasicEmailRegexValid,
  isNameInputValid,
  isEmailValid,
} from "@utility";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import { AttachedLabelInput, Button, Input } from "@base";
import { Link } from "react-router-dom";
import { FacebookSVG, FullLogoSVG, InstagramSVG, TwitterSVG } from "@svgs";
import manager from "./manager.png";
import { PasswordModal } from "./PasswordModal";

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

interface MappableObject {
  [key: string]: string;
}

interface InputState extends MappableObject {
  first_name: string;
  last_name: string;
  email: string;
  name: string;
  slug: string;
}
const slugRegex = new RegExp(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/);

const isBasicSlugValid = (newSlug: string) => slugRegex.test(newSlug);

const SignUpPage: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(prevState => !prevState);
  };

  const [input, setInput] = useState<InputState>({
    first_name: "",
    last_name: "",
    email: "",
    name: "",
    slug: "",
  });

  const [isFirstNameDirty, setIsFirstNameDirty] = useState(false);
  const [isLastNameDirty, setIsLastNameDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isSlugDirty, setIsSlugDirty] = useState(false);

  const getNameErrors = (name: string, isDirtyState: boolean) => {
    if (!isDirtyState) return null;
    if (!isNameValid(name)) return <span>Name is required</span>;
    if (isNameOnlyNumbers(name)) return <span>Name cannot only contain numbers</span>;
    return null;
  };

  const getEmailErrors = () => {
    if (!isEmailDirty) return null;
    if (!isEmailAtValid(input.email)) return <span>@ is required</span>;
    if (!isEmailDotValid(input.email)) return <span>Dot is required</span>;
    if (!isBasicEmailRegexValid(input.email)) return <span>Email is not valid</span>;
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  };

  const handleBlur = (state: string, setDirty: Dispatch<SetStateAction<boolean>>) => {
    if (state.length) setDirty(true);
  };

  const renderSlugError = () => {
    if (!isSlugDirty) return null;
    if (isNameOnlyNumbers(input.slug)) {
      return (
        <div
          className="mt-2 rounded-md bg-red-600 p-2 text-center text-sm font-bold text-white"
          id="email-error"
        >
          Slug can not only contain numbers
        </div>
      );
    }
    if (isBasicSlugValid(input.slug)) return null;
    return (
      <div
        className="mt-2 rounded-md bg-red-600 p-2 text-center text-sm font-bold text-white"
        id="email-error"
      >
        slug can not end with dash or contain any spaces
      </div>
    );
  };

  const isFormValid = () =>
    isNameInputValid(input.first_name) &&
    !isNameOnlyNumbers(input.first_name) &&
    isNameInputValid(input.name) &&
    !isNameOnlyNumbers(input.name) &&
    !isNameOnlyNumbers(input.last_name) &&
    isNameInputValid(input.last_name) &&
    isBasicSlugValid(input.slug) &&
    isEmailValid(input.email);

  return (
    <div className="flex h-screen flex-col justify-between font-Quicksand">
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
                to="/"
                className="origin-border ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-4 py-2 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:bg-red-400  hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/sign-in"
                className="origin-border ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-white px-4 py-2 font-Quicksand text-base font-bold text-red-400 shadow-sm hover:bg-red-400  hover:text-white"
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
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                      <a href="/">
                        <span className="sr-only">Soft Serve Logo</span>
                        <FullLogoSVG className="w-20 fill-current stroke-current text-white" />
                      </a>
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-900">
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
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-400 bg-origin-border px-4 py-2 font-Quicksand text-base font-bold text-white shadow-sm hover:from-red-700 hover:to-red-700"
                    >
                      Home
                    </Link>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </header>
      <main>
        <div className="relative bg-white">
          <div className="lg:absolute lg:inset-0">
            <div className="m-8 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full rounded-md object-cover shadow-md lg:absolute lg:h-full"
                src={manager}
                alt=""
              />
            </div>
          </div>
          <div className="relative py-8 px-4 sm:py-24 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8 lg:py-8">
            <div className="lg:pr-8">
              <div className="mx-auto max-w-md sm:max-w-lg lg:mx-0">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Sign up now!</h2>
                <p className="mt-4 text-lg text-gray-400 sm:mt-3">
                  we just need some basic information to get you started, once you have signed up
                  you can send us your menu and we will get you all started
                </p>
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="mt-9 mr-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <Input
                    themeColour="red"
                    themeTint={400}
                    required
                    value={input.first_name}
                    onChange={handleChange}
                    onBlur={() => handleBlur(input.first_name, setIsFirstNameDirty)}
                    errors={[getNameErrors(input.first_name, isFirstNameDirty)]}
                    labelText="First name"
                    type="text"
                    name="first_name"
                    id="first_name"
                  />
                  <Input
                    themeColour="red"
                    themeTint={400}
                    required
                    value={input.last_name}
                    onChange={handleChange}
                    onBlur={() => handleBlur(input.last_name, setIsLastNameDirty)}
                    errors={[getNameErrors(input.last_name, isLastNameDirty)]}
                    labelText="Last name"
                    type="text"
                    name="last_name"
                    id="last_name"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      themeColour="red"
                      themeTint={400}
                      required
                      value={input.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur(input.email, setIsEmailDirty)}
                      errors={[getEmailErrors()]}
                      labelText="Email"
                      autoComplete="email"
                      type="email"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Input
                      themeColour="red"
                      themeTint={400}
                      required
                      value={input.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur(input.name, setIsNameDirty)}
                      errors={[getNameErrors(input.name, isNameDirty)]}
                      labelText="Restaurant name"
                      type="text"
                      name="name"
                      id="name"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <AttachedLabelInput
                      themeColour="red"
                      themeTint={400}
                      label="Restaurant Slug"
                      name="slug"
                      attachedLabel="www.softserveapp.com/restaurants/"
                      id="slug"
                      value={input.slug}
                      onChange={handleChange}
                      onBlur={() => handleBlur(input.slug, setIsSlugDirty)}
                    />
                    {renderSlugError()}
                  </div>
                  <div className="sm:col-span-2">
                    <Button
                      css="mt-4"
                      disabled={!isFormValid()}
                      size="XXL"
                      isFullwidth
                      themeColour="red"
                      themeTint={400}
                      type="submit"
                    >
                      Continue
                    </Button>
                  </div>
                  <PasswordModal input={input} open={isOpen} setOpen={setIsOpen} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 bg-red-400">
        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            {navigation.social.map(item => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-400">
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
    </div>
  );
};

export { SignUpPage };
