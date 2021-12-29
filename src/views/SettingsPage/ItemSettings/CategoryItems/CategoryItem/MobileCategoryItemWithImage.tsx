import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { Pill, Toggle } from "@base";
import { ItemPrice, ItemImage } from "@presentational";
import { useUpdateItemAvailability } from "./UpdateItemAvailability.mutation";
import { ItemDropdown } from "./ItemDropdown";
import { CategoryItemDietaries } from "./CategoryItemDietaries";

interface Props {
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const MobileCategoryItemWithImage: FC<Props> = ({
  handleDeleteItem,
  categoryID,
  handleUpdateItem,
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
    <div key={item.id} className="flex flex-col rounded-lg shadow-lg overflow-visible relative">
      <div className="flex-shrink-0 h-40">
        <ItemImage
          className="inset-0 w-full h-full object-cover"
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
          handleDelete={() => handleDeleteItem(item, categoryID)}
          handleUpdate={() => handleUpdateItem(item, categoryID)}
        />
      </div>
      <div className="flex-1 bg-white p-2 flex flex-col justify-between">
        <div className="flex w-full justify-between">
          <p className="font-bold font-Quicksand">{item?.name}</p>
          <Toggle isEnabled={isItemAvailable} handleClick={handleToggle} />
        </div>
        <p className="font-Quicksand italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden">
          {item.available ? item.description : "** Temporarily unavailable  **"}
        </p>
        <CategoryItemDietaries itemID={item?.id} />
      </div>

      <div className="flex items-center justify-between px-2 bg-white">
        <ItemPrice position="end" withImage itemID={item.id} />
      </div>
    </div>
  );
};

export { MobileCategoryItemWithImage };
