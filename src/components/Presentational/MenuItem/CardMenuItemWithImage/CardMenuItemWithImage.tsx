import React from "react";
import type { FC } from "react";
import { Item, useDietaryQuery } from "@shared";
import { Dietaries, ItemImage, ItemPrice } from "@presentational";
import { useAllergyContext } from "@contexts";
import { intersection } from "@utility";
import { Card, CardContent } from "@base";
import { SkeletonMenuItemWithImage } from "./SkeletonMenuItemWithImage";

interface Props {
  item: Pick<Item, "description" | "name" | "photo" | "id" | "available">;
}

const CardMenuItemWithImage: FC<Props> = ({ item }) => {
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

  return (
    <Card css="relative" withPadding={false}>
      <div className="md:flex-shrink-0 ">
        <ItemImage className="h-48 w-full object-cover " photoUrl={item.photo} />
      </div>
      <CardContent>
        <div className="flex flex-col h-full justify-between w-full p-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="block text-lg leading-tight font-medium text-black ">
                {item.name}
              </span>
              <div className="mt-2 mx-2 ">
                <Dietaries itemID={item.id} />
              </div>
            </div>
            <p className="mt-2 text-gray-500 break-words italic">{item.description}</p>
          </div>
          <div className="flex items-center flex-wrap w-full">
            <ItemPrice itemID={item.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CardMenuItemWithImage };
