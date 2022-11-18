import React from "react";
import type { FC, DetailedHTMLProps } from "react";
import { Item } from "@shared";
import { Dietaries, ItemPrice } from "@presentational";
import { ItemCard, ThemeFonts, Typography } from "@base";
import { classnames } from "tailwindcss-classnames";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Pick<Item, "description" | "name" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
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
        itemID={item.id}
      />
    );

  const renderDescription = () => {
    if (item?.description?.length) {
      return (
        <Typography
          css={classnames("mb-4", "break-words", "italic")}
          themeFont={themeFont}
          type="h6"
        >
          {item.available ? item.description : "** Temporarily unavailable  **"}
        </Typography>
      );
    }
    return null;
  };

  return (
    <ItemCard {...rest}>
      <div className="flex flex-1 flex-col justify-between bg-white p-2 pb-0">
        <div>
          <div className="flex items-center justify-between py-2">
            <Typography css={classnames("font-bold", "truncate")} themeFont={themeFont} type="h5">
              {item?.name}
            </Typography>
            <Dietaries
              themeColour={themeColour}
              themeTint={themeTint}
              itemAvailable={item.available}
              itemID={item.id}
            />
          </div>
          {renderDescription()}
          {renderPrice()}
        </div>
      </div>
    </ItemCard>
  );
};

export { CardMenuItemWithoutImage };
