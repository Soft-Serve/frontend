import React from "react";
import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { Item } from "@shared";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import { ItemCard, ThemeFonts, Typography } from "@base";
import { classnames } from "tailwindcss-classnames";

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
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
    <ItemCard isVertical {...rest}>
      <div className="relative h-40 flex-shrink-0">
        <ItemImage
          className="inset-0 h-full w-full object-cover"
          unavailable={!item.available}
          photoUrl={item?.photo}
        />
        <div className="absolute top-1 left-1">
          <Dietaries
            themeColour={themeColour}
            themeTint={themeTint}
            itemAvailable={item.available}
            itemID={item.id}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-4">
        <Typography css={classnames("font-bold", "truncate")} themeFont={themeFont} type="h5">
          {item?.name}
        </Typography>
        <Typography
          css={classnames("mt-2", "break-words", "italic")}
          type="h6"
          themeFont={themeFont}
        >
          {item.available ? item.description : "** Temporarily unavailable  **"}
        </Typography>
      </div>
      <div className="w-full bg-white p-2 pb-0">{renderPrice()}</div>
    </ItemCard>
  );
};

export { MobileCardMenuItemWithImage };
