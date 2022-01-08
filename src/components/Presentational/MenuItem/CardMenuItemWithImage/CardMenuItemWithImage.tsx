import React from "react";
import type { FC } from "react";
import { classnames } from "tailwindcss-classnames";
import { Item, useDietaryQuery } from "@shared";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import { useAllergyContext } from "@contexts";
import { intersection } from "@utility";
import { SkeletonMenuItemWithImage } from "./SkeletonMenuItemWithImage";

interface Props {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const CardMenuItemWithImage: FC<Props> = ({ item, themeFont, themeColour, themeTint }) => {
  const { data, error, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const { activeAllergies } = useAllergyContext();

  if (data?.dietaries && intersection(activeAllergies, data?.dietaries)) {
    return null;
  }
  if (loading) return <SkeletonMenuItemWithImage />;
  if (error) return <span>error</span>;

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
    <div key={item.id} className="flex rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0 h-full w-56 relative">
        <ItemImage
          className="inset-0 w-full h-full object-cover"
          unavailable={!item.available}
          photoUrl={item?.photo}
        />
        <Dietaries
          css={classnames("justify-end", "absolute", "top-0", "left-0")}
          itemAvailable={item.available}
          itemID={item.id}
        />
      </div>
      <div className="flex-1 bg-white p-4 flex flex-col justify-between">
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
