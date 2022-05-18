import React, { DetailedHTMLProps } from "react";
import type { FC } from "react";
import { ThemeFonts, Typography } from "@base";

import { classnames } from "tailwindcss-classnames";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import type { Item } from "@shared";

interface Props extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
}

const MobileCardMenuItemWithImage: FC<Props> = ({ item, themeFont, themeColour, themeTint }) => {
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
    <a href="" className="block overflow-hidden rounded-lg bg-white shadow-2xl">
      <ItemImage unavailable={!item?.available} photoUrl={item?.photo} />
      <div className="flex flex-1 flex-col justify-between bg-white p-2 pb-0">
        <div>
          <Dietaries
            themeColour={themeColour}
            themeTint={themeTint}
            itemAvailable={item.available}
            itemID={item.id}
          />

          <Typography css={classnames("font-bold", "my-2")} themeFont={themeFont} type="h5">
            {item?.name}
          </Typography>

          <Typography css={classnames("my-4", "break-words")} type="h6" themeFont={themeFont}>
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </Typography>
        </div>
        {renderPrice()}
      </div>
    </a>
  );
};

export { MobileCardMenuItemWithImage };
