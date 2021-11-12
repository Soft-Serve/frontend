import React from "react";
import type { FC } from "react";

import { RadioTile, RadioTiles } from "@base";
import { useGlobalContext } from "src/contexts";
import { useMenusQuery } from "src/shared";

interface Props {
  closeMenu: any;
}
const MenusMobileNavigation: FC<Props> = ({ closeMenu, ...rest }) => {
  const { setMenuID, menuID } = useGlobalContext();
  const { restaurantSlug } = useGlobalContext();

  const { data } = useMenusQuery({
    variables: {
      restaurantSlug,
    },
  });

  return (
    <nav aria-label="Sections" {...rest} className="flex flex-col justify-between h-full">
      <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
        <p className="text-lg font-medium text-blue-gray-900">Menus</p>
      </div>
      <RadioTiles
        value={data?.menus.find(menu => menu.id === menuID)}
        onChange={e => {
          setMenuID(e?.id);
          closeMenu(false);
        }}
      >
        {data?.menus?.map(menu => (
          <RadioTile value={menu} key={menu.id}>
            <div className="ml-3 text-sm">
              <p className="font-medium text-blue-gray-900">{menu.name}</p>
            </div>
          </RadioTile>
        ))}
      </RadioTiles>
    </nav>
  );
};

export { MenusMobileNavigation };
