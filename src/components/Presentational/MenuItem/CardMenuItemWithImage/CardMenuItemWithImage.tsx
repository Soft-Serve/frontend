import React from "react";
import type { FC, DetailedHTMLProps } from "react";
import { classnames } from "tailwindcss-classnames";
import { Item } from "@shared";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const CardMenuItemWithImage: FC<Props> = ({ item, themeFont, themeColour, themeTint, ...rest }) => {
  const renderPrice = () =>
    item?.available && (
      <ItemPrice
        themeFont={themeFont}
        themeColour={themeColour}
        themeTint={themeTint}
        withImage
        itemID={item.id}
      />
    );

  return (
    <div key={item.id} className="flex overflow-hidden rounded-md shadow-md" {...rest}>
      <div className="relative h-full w-56 flex-shrink-0">
        <ItemImage
          className="inset-0 h-full w-full object-cover"
          unavailable={!item.available}
          photoUrl={item?.photo}
        />
        <Dietaries
          themeColour={themeColour}
          themeTint={themeTint}
          css={classnames("justify-end", "absolute", "top-1", "left-1")}
          itemAvailable={item.available}
          itemID={item.id}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-2 pb-0">
        <div>
          <p className={`font-bold font-${themeFont}`}>{item?.name}</p>
          <p
            className={`font-${themeFont} mt-2 overflow-hidden text-ellipsis break-words text-sm italic text-gray-600`}
          >
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
        </div>
        {renderPrice()}
      </div>
    </div>
  );
};

export { CardMenuItemWithImage };
