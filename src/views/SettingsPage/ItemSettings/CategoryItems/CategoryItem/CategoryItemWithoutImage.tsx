import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { Pill, Toggle } from "@base";
import { Dietaries, ItemPrice } from "@presentational";
import { useUpdateItemAvailability } from "./UpdateItemAvailability.mutation";
import { ItemDropdown } from "./ItemDropdown";

interface Props {
  themeFont: string;
  themeColour: string;
  themeTint: number;
  handleAddDietary: (item: Item) => void;
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItemWithoutImage: FC<Props> = ({
  themeFont,
  themeTint,
  themeColour,
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
    <div key={item.id} className="relative flex overflow-visible rounded-lg shadow-lg">
      <div className="flex flex-1 flex-col justify-between bg-white p-2 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h4 className="mr-2 font-Quicksand font-bold">{item?.name}</h4>
            <Pill type={isItemAvailable ? "success" : "error"}>
              {isItemAvailable ? "Available" : "86"}
            </Pill>
          </div>
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
        <Dietaries
          themeColour={themeColour}
          themeTint={themeTint}
          itemAvailable={item.available}
          itemID={item.id}
        />
        <p className="mt-2 mb-2 overflow-hidden text-ellipsis break-words font-Quicksand text-sm italic text-gray-600">
          {item.available ? item.description : "** Temporarily unavailable  **"}
        </p>
        <ItemPrice
          themeColour={themeColour}
          themeTint={themeTint}
          themeFont={themeFont}
          position="end"
          withImage
          itemID={item.id}
        />
      </div>
    </div>
  );
};

export { CategoryItemWithoutImage };
