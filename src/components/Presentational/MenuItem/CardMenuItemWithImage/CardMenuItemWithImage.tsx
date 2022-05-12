import React from "react";
import type { FC, DetailedHTMLProps } from "react";
import { Item } from "@shared";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import { ItemCard, ThemeFonts, Typography } from "@base";
import { classnames } from "tailwindcss-classnames";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
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
    <ItemCard {...rest}>
      <div className=" h-auto w-24 flex-shrink-0 xxs:w-28 xs:w-52">
        <ItemImage
          className="inset-0 h-full w-full object-cover"
          unavailable={!item.available}
          photoUrl={item?.photo}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-2 pb-0">
        <div>
          <div className="flex w-full justify-between">
            <Typography
              css={classnames("font-bold", "mr-2", "mb-2")}
              themeFont={themeFont}
              type="h5"
            >
              {item?.name}
            </Typography>
            <Dietaries
              themeColour={themeColour}
              themeTint={themeTint}
              itemAvailable={item.available}
              itemID={item.id}
            />
          </div>
          <Typography css={classnames("my-4", "break-words")} type="h6" themeFont={themeFont}>
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </Typography>
        </div>
        {renderPrice()}
      </div>
    </ItemCard>
  );
};

export { CardMenuItemWithImage };
