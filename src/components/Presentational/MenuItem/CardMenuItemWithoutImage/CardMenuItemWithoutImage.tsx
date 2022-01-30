import React from "react";
import type { FC, DetailedHTMLProps } from "react";
import { Item } from "@shared";
import { Dietaries, ItemPrice } from "@presentational";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Pick<Item, "description" | "name" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const CardMenuItemWithoutImage: FC<Props> = ({
  item,
  themeFont,
  themeColour,
  themeTint,
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
    <div key={item.id} className="flex overflow-hidden rounded-lg shadow-lg" {...rest}>
      <div className="relative flex flex-1 flex-col justify-between bg-white p-2 pb-0">
        <div>
          <div className="flex items-center justify-between py-2 ">
            <p className={`font-bold font-${themeFont} truncate`}>{item?.name}</p>
            <Dietaries
              themeColour={themeColour}
              themeTint={themeTint}
              itemAvailable={item.available}
              itemID={item.id}
            />
          </div>
          <p
            className={`font-${themeFont} mb-4 overflow-hidden  text-ellipsis break-words text-sm italic text-gray-600`}
          >
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          {renderPrice()}
        </div>
      </div>
    </div>
  );
};

export { CardMenuItemWithoutImage };
