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
    <div key={item.id} className="flex rounded-md shadow-md overflow-hidden" {...rest}>
      <div className="flex-shrink-0 h-full w-56 relative">
        <ItemImage
          className="inset-0 w-full h-full object-cover"
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
      <div className="flex-1 bg-white p-2 pb-0 flex flex-col justify-between">
        <div>
          <p className={`font-bold font-${themeFont}`}>{item?.name}</p>
          <p
            className={`font-${themeFont} italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden`}
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
