import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import type { FC } from "react";

import { RadioTile, RadioTiles } from "@base";
import { SUB_NAVIGATION } from "@constants";
import { Link } from "react-router-dom";
import { routes } from "@routes";
import { capatalize } from "@utility";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  selected: string;
  setSelected: any;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

const SettingsSubMenu: FC<Props> = ({
  selected,
  restaurantSlug,
  setSelected,
  themeTint,
  themeColour,
  ...rest
}) => {
  return (
    <nav aria-label="Sections" {...rest}>
      <div className="border-blue-gray-200 flex h-16 flex-shrink-0 items-center border-b px-6">
        <p className="text-blue-gray-900 font-Quicksand text-lg font-bold">Settings</p>
      </div>
      <RadioTiles value={selected} onChange={setSelected}>
        {SUB_NAVIGATION.map(item => (
          <Link
            key={item.name}
            to={`${routes.restaurants}/${restaurantSlug}/settings/${item.name}`}
          >
            <RadioTile themeColour={themeColour} themeTint={themeTint} value={item.name}>
              <item.icon
                className={`-mt-0.5 h-6 w-6 flex-shrink-0 text-${themeColour}-${themeTint}`}
                aria-hidden="true"
              />
              <div className="ml-3 text-sm">
                <p className="text-blue-gray-900 font-Quicksand font-bold">
                  {capatalize(item.name)}
                </p>
                <p className="mt-1 font-Quicksand text-gray-500">{item.description}</p>
              </div>
            </RadioTile>
          </Link>
        ))}
      </RadioTiles>
    </nav>
  );
};

export { SettingsSubMenu };
