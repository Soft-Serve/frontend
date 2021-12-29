import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { Pill, Toggle } from "@base";
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
}

const DesktopCategoryItemWithImage: FC<Props> = ({
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
    <div key={item.id} className="flex rounded-lg shadow-lg overflow-visible relative">
      <div className="flex-shrink-0 h-full w-56 relative">
        <ItemImage className="inset-0 w-full h-full object-cover" photoUrl={item?.photo} />
        <div className="flex items-center absolute top-3 left-1">
          <Pill type={isItemAvailable ? "success" : "error"}>
            {isItemAvailable ? "Available" : "86"}
          </Pill>
        </div>
      </div>
      <div className="flex-1 bg-white flex flex-col p-2 justify-between">
        <div className="w-full">
          <div className="w-full flex justify-between items-center">
            <h4 className="font-bold font-Quicksand inline-flex flex-wrap">{item?.name}</h4>
            <div className="flex items-center">
              <div className="mx-2">
                <Toggle isEnabled={isItemAvailable} handleClick={handleToggle} />
              </div>
              <ItemDropdown
                handleAllergies={() => handleAddDietary(item)}
                handleDelete={() => handleDeleteItem(item, categoryID)}
                handleUpdate={() => handleUpdateItem(item, categoryID)}
              />
            </div>
          </div>
          <p className="font-Quicksand italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden">
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          <CategoryItemDietaries itemID={item?.id} />
        </div>
        <ItemPrice position="end" withImage itemID={item.id} />
      </div>
    </div>
  );
};

export { DesktopCategoryItemWithImage };
