import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import type { FC } from "react";

import { RadioTile, RadioTiles } from "@base";
import { SUB_NAVIGATION } from "@constants";
import { useRestaurantContext } from "@contexts";
import { Link } from "react-router-dom";
import { routes } from "@routes";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  selected: string;
  setSelected: any;
}

const SettingsSubMenu: FC<Props> = ({ selected, setSelected, ...rest }) => {
  const { themeColour, themeTint, restaurantSlug } = useRestaurantContext();

  const capatalize = ([firstLetter, ...restOfWord]: string) =>
    [firstLetter.toUpperCase(), ...restOfWord].join("");

  return (
    <nav aria-label="Sections" {...rest}>
      <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
        <p className="text-lg font-bold text-blue-gray-900 font-Quicksand">Settings</p>
      </div>
      <RadioTiles value={selected} onChange={setSelected}>
        {SUB_NAVIGATION.map(item => (
          <Link key={item.name} to={`${routes.settings}/${restaurantSlug}/${item.name}`}>
            <RadioTile value={item.name}>
              <item.icon
                className={`flex-shrink-0 -mt-0.5 h-6 w-6 text-${themeColour}-${themeTint}`}
                aria-hidden="true"
              />
              <div className="ml-3 text-sm">
                <p className="font-bold text-blue-gray-900 font-Quicksand">
                  {capatalize(item.name)}
                </p>
                <p className="mt-1 text-gray-500 font-Quicksand">{item.description}</p>
              </div>
            </RadioTile>
          </Link>
        ))}
      </RadioTiles>
    </nav>
  );
};

export { SettingsSubMenu };
