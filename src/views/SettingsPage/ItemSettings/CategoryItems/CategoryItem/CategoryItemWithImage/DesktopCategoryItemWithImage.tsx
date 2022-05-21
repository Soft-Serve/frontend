import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { Pill, ThemeFonts, Toggle } from "@base";
import { ItemPrice, ItemImage } from "@presentational";
import { useUpdateItemAvailability } from "../UpdateItemAvailability.mutation";
import { ItemDropdown } from "../ItemDropdown";
import { CategoryItemDietaries } from "../CategoryItemDietaries";

interface Props {
  handleAddDietary: (item: Item) => void;
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
}

const DesktopCategoryItemWithImage: FC<Props> = ({
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
  handleAddDietary,
  themeColour,
  themeTint,
  themeFont,
  item,
}) => {
  const [isItemAvailable, setIsItemAvailable] = useState(item.available);
  const [toggleAvailability] = useUpdateItemAvailability();

  const handleToggle = () => {
    toggleAvailability({
      variables: {
        input: {
          id: item.id,
          available: !isItemAvailable,
        },
      },
    });

    setIsItemAvailable(prevState => !prevState);
  };

  return (
    <div key={item.id} className="relative flex rounded-md shadow-md">
      <div className="relative h-full w-56 flex-shrink-0">
        <ItemImage className="inset-0 h-full w-full object-cover" photoUrl={item?.photo} />
        <div className="absolute top-3 left-1 flex items-center">
          <Pill type={isItemAvailable ? "success" : "error"}>
            {isItemAvailable ? "Available" : "86"}
          </Pill>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-2 pb-0">
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h4 className="inline-flex flex-wrap font-Quicksand font-bold">{item?.name}</h4>
            <div className="flex items-center">
              <div className="mx-2">
                <Toggle
                  themeColour={themeColour}
                  themeTint={themeTint}
                  isEnabled={isItemAvailable}
                  handleClick={handleToggle}
                />
              </div>
              <ItemDropdown
                themeColour={themeColour}
                themeTint={themeTint}
                handleAllergies={() => handleAddDietary(item)}
                handleDelete={() => handleDeleteItem(item, categoryID)}
                handleUpdate={() => handleUpdateItem(item, categoryID)}
              />
            </div>
          </div>
          <p className="mt-2 overflow-hidden text-ellipsis break-words font-Quicksand text-sm italic text-gray-600">
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          <CategoryItemDietaries
            themeFont={themeFont}
            themeColour={themeColour}
            themeTint={themeTint}
            itemID={item?.id}
          />
        </div>
        <ItemPrice
          themeFont={themeFont}
          themeColour={themeColour}
          themeTint={themeTint}
          position="end"
          withImage
          itemID={item.id}
        />
      </div>
    </div>
  );
};

export { DesktopCategoryItemWithImage };
