import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { useRestaurantContext } from "@contexts";
import { CardMenuItemWithImage } from "./CardMenuItemWithImage";
import { CardMenuItemWithoutImage } from "./CardMenuItemWithoutImage";

interface Props {
  item: Item;
}

const MenuItem: FC<Props> = ({ item }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  if (item.photo && item.photo.length) {
    return (
      <>
        {item.available && <CardMenuItemWithImage item={item} />}
        {!item.available && (
          <div className="relative">
            <CardMenuItemWithImage item={item} />
            <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-2xl">
              <div
                className={`p-4 bg-gray-100 rounded-md flex items-center justify-center bg-opacity-75 w-full h-full text-3xl text-${themeColour}-${themeTint} text-center font-extrabold`}
              >
                Sold out
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      {item.available && <CardMenuItemWithoutImage item={item} />}
      {!item.available && (
        <div className="z-20 opacity-30">
          <CardMenuItemWithoutImage item={item} />
        </div>
      )}
    </>
  );
};

export { MenuItem };
