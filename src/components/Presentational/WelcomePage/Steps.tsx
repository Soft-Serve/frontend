import React from "react";
import type { FC } from "react";

import { CheckIcon } from "@heroicons/react/solid";
import { routes } from "src/routes";
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
      href: `${routes.settings}/${restaurantSlug}/restaurant`,
      status: hasStyles || hasMenus || hasItems ? "complete" : "current",
    },
    {
      name: "Create menus",
      description: "Add your restaurant's menu names",
      href: `${routes.settings}/${restaurantSlug}/menus`,
      status: menuStatus(),
    },
    {
      name: "Add categories & items",
      description:
        "Add categories and items to your menus. Menus can be created without categories if you do not wish to use them.",
      href: `${routes.settings}/${restaurantSlug}/categories`,
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
            className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-${themeColour}-${themeTint}`}
            aria-hidden="true"
          />
        )}
        <Link to={step.href} className="relative flex items-start group">
          <span className="h-9 flex items-center">
            <span
              className={`relative z-10 w-8 h-8 flex items-center justify-center bg-${themeColour}-${themeTint} rounded-full group-hover:bg-${themeColour}-200`}
            >
              <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
            </span>
          </span>
          <span className="ml-4 min-w-0 flex flex-col">
            <span className="text-xs font-semibold tracking-wide uppercase">{step.name}</span>
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
            className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
            aria-hidden="true"
          />
        )}
        <a href={step.href} className="relative flex items-start group" aria-current="step">
          <span className="h-9 flex items-center" aria-hidden="true">
            <span
              className={`relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-${themeColour}-${themeTint} rounded-full`}
            >
              <span className={`h-2.5 w-2.5 bg-${themeColour}-${themeTint} rounded-full`} />
            </span>
          </span>
          <span className="ml-4 min-w-0 flex flex-col">
            <span
              className={`text-xs font-semibold tracking-wide uppercase text-${themeColour}-${themeTint}`}
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
            className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
            aria-hidden="true"
          />
        )}
        <a href={step.href} className="relative flex items-start group">
          <span className="h-9 flex items-center" aria-hidden="true">
            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
              <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
            </span>
          </span>
          <span className="ml-4 min-w-0 flex flex-col">
            <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
              {step.name}
            </span>
            <span className="text-sm text-gray-500">{step.description}</span>
          </span>
        </a>
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
