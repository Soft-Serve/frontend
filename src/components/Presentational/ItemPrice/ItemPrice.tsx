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
    <div className="flex flex-wrap items-center justify-end">
      {data?.itemSizes?.map(size => (
        <PriceTag
          isMultiSize={data?.itemSizes.length > 1}
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
