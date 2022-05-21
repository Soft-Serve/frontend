import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { Pill, ThemeFonts, Toggle } from "@base";
import { ItemPrice, ItemImage } from "@presentational";
import { useUpdateItemAvailability } from "../UpdateItemAvailability.mutation";
import { ItemDropdown } from "../ItemDropdown";
import { CategoryItemDietaries } from "../CategoryItemDietaries";

interface Props {
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
  handleAddDietary: (item: Item) => void;
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const MobileCategoryItemWithImage: FC<Props> = ({
  themeFont,
  themeColour,
  themeTint,
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
  handleAddDietary,
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
    <div key={item.id} className="relative flex flex-col rounded-md shadow-md">
      <div className="h-40 flex-shrink-0">
        <ItemImage
          className="inset-0 h-full w-full object-cover"
          unavailable={!item.available}
          photoUrl={item?.photo}
        />
      </div>
      <div className="absolute top-1">
        <Pill type={isItemAvailable ? "success" : "error"}>
          {isItemAvailable ? "Available" : "86"}
        </Pill>
      </div>
      <div className="absolute top-1 right-1">
        <ItemDropdown
          themeColour={themeColour}
          themeTint={themeTint}
          handleAllergies={() => handleAddDietary(item)}
          handleDelete={() => handleDeleteItem(item, categoryID)}
          handleUpdate={() => handleUpdateItem(item, categoryID)}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-2">
        <div className="flex w-full justify-between">
          <p className="font-Quicksand font-bold">{item?.name}</p>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <p className="mt-2 overflow-hidden text-ellipsis break-words font-Quicksand text-sm italic text-gray-600">
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          <Toggle
            themeColour={themeColour}
            themeTint={themeTint}
            isEnabled={isItemAvailable}
            handleClick={handleToggle}
          />
        </div>
        <CategoryItemDietaries
          themeFont={themeFont}
          themeColour={themeColour}
          themeTint={themeTint}
          itemID={item?.id}
        />
      </div>

      <div className="flex items-center justify-between bg-white px-2">
        <ItemPrice
          themeColour={themeColour}
          themeFont={themeFont}
          themeTint={themeTint}
          position="end"
          withImage
          itemID={item.id}
        />
      </div>
    </div>
  );
};

export { MobileCategoryItemWithImage };
