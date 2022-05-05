import React from "react";
import type { FC } from "react";

import { CheckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

interface Step {
  name: string;
  description: string;
  href: string;
  status: string;
}

interface Props {
  hasMenus: boolean;
  hasItems: boolean;
  hasStyles: boolean;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const Steps: FC<Props> = ({
  hasMenus,
  hasItems,
  hasStyles,
  themeTint,
  themeColour,
  restaurantSlug,
}) => {
  const itemStatus = () => {
    if (!hasMenus) return "upcoming";

    if (hasItems) return "complete";

    return "current";
  };

  const menuStatus = () => {
    if (hasMenus) return "complete";

    if (!hasStyles && !hasMenus) return "upcoming";

    return "current";
  };

  const steps = [
    {
      name: "Customize menu design",
      description: "Choose your menu colour, logo and banner",
      href: `/restaurants/${restaurantSlug}/settings/restaurant`,
      status: hasStyles || hasMenus || hasItems ? "complete" : "current",
    },
    {
      name: "Create menus",
      description: "Add your restaurant's menu names",
      href: `/restaurants/${restaurantSlug}/settings/menus`,
      status: menuStatus(),
    },
    {
      name: "Add categories & items",
      description:
        "Add categories and items to your menus. Menus can be created without categories if you do not wish to use them.",
      href: `/restaurants/${restaurantSlug}/settings/categories`,
      status: itemStatus(),
    },
  ];

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(" ");
  };

  const listCompletedStep = (step: Step, stepIdx: number) => {
    return (
      <>
        {stepIdx !== steps.length - 1 && (
          <div
            className={`absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-${themeColour}-${themeTint}`}
            aria-hidden="true"
          />
        )}
        <Link to={step.href} className="group relative flex items-start">
          <span className="flex h-9 items-center">
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center bg-${themeColour}-${themeTint} rounded-full group-hover:bg-${themeColour}-200`}
            >
              <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
          </span>
          <span className="ml-4 flex min-w-0 flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide">{step.name}</span>
            <span className="text-sm text-gray-500">{step.description}</span>
          </span>
        </Link>
      </>
    );
  };

  const listCurrentStep = (step: Step, stepIdx: number) => {
    return (
      <>
        {stepIdx !== steps.length - 1 && (
          <div
            className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
            aria-hidden="true"
          />
        )}
        <a href={step.href} className="group relative flex items-start" aria-current="step">
          <span className="flex h-9 items-center" aria-hidden="true">
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center border-2 bg-white border-${themeColour}-${themeTint} rounded-full`}
            >
              <span className={`h-2.5 w-2.5 bg-${themeColour}-${themeTint} rounded-full`} />
            </span>
          </span>
          <span className="ml-4 flex min-w-0 flex-col">
            <span
              className={`text-xs font-semibold uppercase tracking-wide text-${themeColour}-${themeTint}`}
            >
              {step.name}
            </span>
            <span className="text-sm text-gray-500">{step.description}</span>
          </span>
        </a>
      </>
    );
  };

  const listUpcomingStep = (step: Step, stepIdx: number) => {
    return (
      <>
        {stepIdx !== steps.length - 1 && (
          <div
            className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
            aria-hidden="true"
          />
        )}
        <Link to={step.href} className="group relative flex items-start">
          <span className="flex h-9 items-center" aria-hidden="true">
            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
              <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
            </span>
          </span>
          <span className="ml-4 flex min-w-0 flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {step.name}
            </span>
            <span className="text-sm text-gray-500">{step.description}</span>
          </span>
        </Link>
      </>
    );
  };

  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(stepIdx !== steps.length - 1 ? "pb-10" : "", "relative")}
          >
            {step.status === "complete" && listCompletedStep(step, stepIdx)}
            {step.status === "current" && listCurrentStep(step, stepIdx)}
            {step.status === "upcoming" && listUpcomingStep(step, stepIdx)}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export { Steps };
