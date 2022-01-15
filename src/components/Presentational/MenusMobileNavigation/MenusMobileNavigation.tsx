import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";

import { RadioTile, RadioTiles } from "@base";
import { useMenusQuery } from "@shared";

interface Props {
  closeMenu: any;
  themeColour: string;
  themeTint: number;
  themeFont: string;
  restaurantSlug: string;
  setMenuID: Dispatch<SetStateAction<number>>;
  menuID: number;
}
const MenusMobileNavigation: FC<Props> = ({
  themeColour,
  themeTint,
  themeFont,
  closeMenu,
  restaurantSlug,
  setMenuID,
  menuID,

  ...rest
}) => {
  const { data } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
  });

  const isActiveMenu = data?.menus?.find(menu => menu.id === menuID);

  return (
    <nav aria-label="Sections" {...rest} className="flex flex-col justify-between h-full">
      <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
        <p className={`text-lg font-bold text-blue-gray-900 font-${themeFont}`}>Select Menu</p>
      </div>
      <RadioTiles
        value={isActiveMenu}
        onChange={e => {
          setMenuID(e?.id);
          closeMenu(false);
        }}
      >
        {data?.menus?.map(menu => (
          <RadioTile themeColour={themeColour} themeTint={themeTint} value={menu} key={menu.id}>
            <div className="ml-3 text-sm">
              <p className="text-blue-gray-900">
                <span
                  className={`font-${themeFont} ${isActiveMenu?.id === menu.id && "font-bold"}`}
                >
                  {menu.name}
                </span>
              </p>
            </div>
          </RadioTile>
        ))}
      </RadioTiles>
    </nav>
  );
};

export { MenusMobileNavigation };
