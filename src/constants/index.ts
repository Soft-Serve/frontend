import {
  BookOpenIcon,
  ClipboardListIcon,
  CogIcon,
  HomeIcon,
  UserIcon,
  ViewGridIcon,
  PhotographIcon,
  QrcodeIcon,
  LightningBoltIcon,
} from "@heroicons/react/solid";

interface ColourObject {
  [key: string]: string;
}

/* eslint-disable */
const colors = require("tailwindcss/colors");

// Shahyn if you value your life do not change again
export const uid = "uid";
export const accessToken = "access-token";
export const clientToken = "client";
export const SUB_NAVIGATION = [
  {
    name: "restaurant",
    description: "View and edit your restaurant information",
    icon: HomeIcon,
    current: true,
  },
  {
    name: "QR",
    description: "print your QR code",
    icon: QrcodeIcon,
    current: false,
  },
  {
    name: "banner",
    description: "Update hero image and header",
    icon: PhotographIcon,
    current: false,
  },
  {
    name: "account",
    description: "Your account information",
    icon: CogIcon,
    current: false,
  },
  {
    name: "users",
    description: "View and add users",
    icon: UserIcon,
    current: false,
  },
  {
    name: "menus",
    description: "View and update your menu's",
    icon: BookOpenIcon,
    current: false,
  },
  {
    name: "categories",
    description: "View and add categories",
    icon: ViewGridIcon,
    current: false,
  },
  {
    name: "items",
    description: "View and edit your menu items",
    icon: ClipboardListIcon,
    current: false,
  },
  {
    name: "promotions",
    description: "set happy hour/promotions",
    icon: LightningBoltIcon,
    current: false,
  },
  // {
  //   name: "dietaries",
  //   description: "View and modify dietary filters",
  //   icon: FilterIcon,
  //   current: false,
  // },

  // {
  //   name: "billing",
  //   description: "View and modify your billing information",
  //   icon: CreditCardIcon,
  //   current: false,
  // },
];

const createDarkColourObj = (tailwindColourObject: ColourObject) =>
  Object.fromEntries(Object.entries(tailwindColourObject).splice(4));

const createLightColourObj = (tailwindColourObject: ColourObject) =>
  Object.fromEntries(Object.entries(tailwindColourObject).splice(1, 5));

export const darkColorsMap = {
  rose: createDarkColourObj(colors.rose),
  pink: createDarkColourObj(colors.pink),
  fuchsia: createDarkColourObj(colors.fuchsia),
  purple: createDarkColourObj(colors.purple),
  violet: createDarkColourObj(colors.violet),
  indigo: createDarkColourObj(colors.indigo),
  blue: createDarkColourObj(colors.blue),
  sky: createDarkColourObj(colors.sky),
  cyan: createDarkColourObj(colors.cyan),
  teal: createDarkColourObj(colors.teal),
  emerald: createDarkColourObj(colors.emerald),
  green: createDarkColourObj(colors.green),
  lime: createDarkColourObj(colors.lime),
  yellow: createDarkColourObj(colors.yellow),
  amber: createDarkColourObj(colors.amber),
  orange: createDarkColourObj(colors.orange),
  red: createDarkColourObj(colors.red),
  slate: createDarkColourObj(colors.slate),
  gray: createDarkColourObj(colors.gray),
  zinc: createDarkColourObj(colors.zinc),
  neutral: createDarkColourObj(colors.neutral),
  stone: createDarkColourObj(colors.stone),
};

export const lightColorsMap = {
  rose: createLightColourObj(colors.rose),
  pink: createLightColourObj(colors.pink),
  fuchsia: createLightColourObj(colors.fuchsia),
  purple: createLightColourObj(colors.purple),
  violet: createLightColourObj(colors.violet),
  indigo: createLightColourObj(colors.indigo),
  blue: createLightColourObj(colors.blue),
  sky: createLightColourObj(colors.sky),
  cyan: createLightColourObj(colors.cyan),
  teal: createLightColourObj(colors.teal),
  emerald: createLightColourObj(colors.emerald),
  green: createLightColourObj(colors.green),
  lime: createLightColourObj(colors.lime),
  yellow: createLightColourObj(colors.yellow),
  amber: createLightColourObj(colors.amber),
  orange: createLightColourObj(colors.orange),
  red: createLightColourObj(colors.red),
  slate: createLightColourObj(colors.slate),
  gray: createLightColourObj(colors.gray),
  zinc: createLightColourObj(colors.zinc),
  neutral: createLightColourObj(colors.neutral),
  stone: createLightColourObj(colors.stone),
};

export const lightColors = Object.entries(lightColorsMap);

export const darkColours = Object.entries(darkColorsMap);

export type DarkColoursMap = typeof darkColours;
