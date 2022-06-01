import React from "react";
import type { FC } from "react";
import { useItemSizeQuery } from "@shared";
import { ThemeFonts } from "@base";
import { PriceTag } from "../PriceTag/PriceTag";

interface Props {
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  itemID: number;
}

const ItemPrice: FC<Props> = ({ itemID, themeColour, themeTint, themeFont }) => {
  const { data } = useItemSizeQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      itemID,
    },
    skip: !itemID,
  });

  return (
    <div className="flex flex-col items-center justify-end xs:flex-row">
      {data?.itemSizes?.map(size => (
        <PriceTag
          key={size?.id}
          themeFont={themeFont}
          size={size}
          themeColour={themeColour}
          themeTint={themeTint}
        />
      ))}
    </div>
  );
};

export { ItemPrice };
