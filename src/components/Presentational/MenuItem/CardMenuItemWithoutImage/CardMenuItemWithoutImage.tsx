import React from "react";
import type { FC } from "react";
import { Item, useDietaryQuery } from "@shared";
import { Dietaries, ItemPrice } from "@presentational";
import { useAllergyContext } from "@contexts";
import { intersection } from "@utility";
import { Card, CardContent } from "@base";
import { SkeletonMenuItemWithoutImage } from "./SkeletonMenuItemWithoutImage";

interface Props {
  item: Pick<Item, "description" | "name" | "id">;
}

const CardMenuItemWithoutImage: FC<Props> = ({ item }) => {
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

  return (
    <Card withPadding={false}>
      <CardContent>
        <div className="flex flex-col h-full justify-between w-full p-4 z-10">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="block text-lg leading-tight font-medium text-black ">
                  {item.name}
                </span>
                <p className="mt-2 text-gray-500 break-words italic">{item.description}</p>
              </div>

              <div>
                <div className="w-full">
                  <ItemPrice itemID={item.id} />
                </div>
              </div>
            </div>
          </div>
          <Dietaries itemID={item.id} />
        </div>
      </CardContent>
    </Card>
  );
};

export { CardMenuItemWithoutImage };
