import React from "react";
import type { FC } from "react";
import { Item, useDietaryQuery } from "@shared";
import { Dietaries, ItemPrice } from "@presentational";
import { useAllergyContext } from "@contexts";
import { intersection } from "@utility";
import { Card, CardContent } from "@base";
import { SkeletonMenuItemWithoutImage } from "./SkeletonMenuItemWithoutImage";

interface Props {
  item: Pick<Item, "description" | "name" | "id" | "available">;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}

const CardMenuItemWithoutImage: FC<Props> = ({ item, themeFont, themeColour, themeTint }) => {
  const { data, error, loading } = useDietaryQuery({
    variables: {
      itemID: item.id,
    },
  });

  const { activeAllergies } = useAllergyContext();

  if (data?.dietaries && intersection(activeAllergies, data?.dietaries)) {
    return null;
  }
  if (loading) return <SkeletonMenuItemWithoutImage />;
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
    <Card withPadding={false}>
      <CardContent>
        <div className="flex-1 bg-white px-4 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between py-2">
              <p className={`font-bold font-${themeFont} truncate`}>{item?.name}</p>
              <Dietaries
                themeColour={themeColour}
                themeTint={themeTint}
                itemAvailable={item.available}
                itemID={item.id}
              />
            </div>
            <p
              className={`font-${themeFont} italic text-gray-600  text-sm break-words text-ellipsis overflow-hidden`}
            >
              {item.available ? item.description : "** Temporarily unavailable  **"}
            </p>
            {renderPrice()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CardMenuItemWithoutImage };
