import React from "react";
import type { FC } from "react";
import { Item, useDietaryQuery } from "@shared";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import { useAllergyContext } from "@contexts";
import { intersection } from "@utility";
import { classnames } from "tailwindcss-classnames";

interface Props {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const MobileCardMenuItemWithImage: FC<Props> = ({ item, themeTint, themeColour, themeFont }) => {
  const { data, error, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const { activeAllergies } = useAllergyContext();

  if (data?.dietaries && intersection(activeAllergies, data?.dietaries)) {
    return null;
  }
  if (loading) return <span>Loading</span>;
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
    <div key={item.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
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
      <div className="w-full bg-white p-2">{renderPrice()}</div>
    </div>
  );
};

export { MobileCardMenuItemWithImage };
