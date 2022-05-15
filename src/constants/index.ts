import {
  BookOpenIcon,
  ClipboardListIcon,
  CogIcon,
  HomeIcon,
  UserIcon,
  ViewGridIcon,
  PhotographIcon,
  QrcodeIcon,
} from "@heroicons/react/solid";

interface ColourObject {
  [key: string]: string;
}

/* eslint-disable */
const colors = require("tailwindcss/colors");
const createColourObj = (tailwindColourObject: ColourObject) =>
  Object.fromEntries(Object.entries(tailwindColourObject).splice(4));

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
  // {
  //   name: "dietaries",
  //   description: "View and modify dietary filters",
  //   icon: FilterIcon,
  //   current: false,
  // },
  {
    name: "QR",
    description: "print your QR code",
    icon: QrcodeIcon,
    current: false,
  },
  // {
  //   name: "billing",
  //   description: "View and modify your billing information",
  //   icon: CreditCardIcon,
  //   current: false,
  // },
];

export const colorsMap = {
  rose: createColourObj(colors.rose),
  pink: createColourObj(colors.pink),
  fuchsia: createColourObj(colors.fuchsia),
  purple: createColourObj(colors.purple),
  violet: createColourObj(colors.violet),
  indigo: createColourObj(colors.indigo),
  blue: createColourObj(colors.blue),
  sky: createColourObj(colors.sky),
  cyan: createColourObj(colors.cyan),
  teal: createColourObj(colors.teal),
  emerald: createColourObj(colors.emerald),
  green: createColourObj(colors.green),
  lime: createColourObj(colors.lime),
  yellow: createColourObj(colors.yellow),
  amber: createColourObj(colors.amber),
  orange: createColourObj(colors.orange),
  red: createColourObj(colors.red),
  slate: createColourObj(colors.slate),
  gray: createColourObj(colors.gray),
  zinc: createColourObj(colors.zinc),
  neutral: createColourObj(colors.neutral),
  stone: createColourObj(colors.stone),
};
