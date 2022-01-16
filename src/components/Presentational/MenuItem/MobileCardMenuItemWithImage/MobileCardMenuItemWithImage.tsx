import React from "react";
import type { FC, DetailedHTMLProps } from "react";
import { Item } from "@shared";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import { classnames } from "tailwindcss-classnames";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const MobileCardMenuItemWithImage: FC<Props> = ({
  item,
  themeTint,
  themeColour,
  themeFont,
  ...rest
}) => {
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
    <div key={item.id} className="flex flex-col rounded-md shadow-md overflow-hidden" {...rest}>
      <div className="flex-shrink-0 h-40 relative">
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
      <div className="flex-1 bg-white p-4 flex flex-col justify-between">
        <div className="flex w-full justify-between">
          <p className={`font-bold font-${themeFont}`}>{item?.name}</p>
        </div>
        <p
          className={`font-${themeFont} italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden`}
        >
          {item.available ? item.description : "** Temporarily unavailable  **"}
        </p>
      </div>
      <div className="w-full bg-white p-2 pb-0">{renderPrice()}</div>
    </div>
  );
};

export { MobileCardMenuItemWithImage };
