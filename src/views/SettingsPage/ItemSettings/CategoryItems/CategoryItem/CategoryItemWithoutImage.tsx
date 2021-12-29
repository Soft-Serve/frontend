import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { Pill, Toggle } from "@base";
import { ItemPrice } from "@presentational";
import { useUpdateItemAvailability } from "./UpdateItemAvailability.mutation";
import { ItemDropdown } from "./ItemDropdown";

interface Props {
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItemWithoutImage: FC<Props> = ({
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
    <div key={item.id} className="flex rounded-lg shadow-lg overflow-visible relative">
      <div className="flex-1 bg-white flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h4 className="font-bold font-Quicksand mr-2">{item?.name}</h4>
            <Pill type={isItemAvailable ? "success" : "error"}>
              {isItemAvailable ? "Available" : "86"}
            </Pill>
          </div>
          <div className="flex items-center">
            <div className="mx-2">
              <Toggle isEnabled={isItemAvailable} handleClick={handleToggle} />
            </div>
            <ItemDropdown
              handleDelete={() => handleDeleteItem(item, categoryID)}
              handleUpdate={() => handleUpdateItem(item, categoryID)}
            />
          </div>
        </div>
        <p className="font-Quicksand italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden mb-2">
          {item.available ? item.description : "** Temporarily unavailable  **"}
        </p>
        <ItemPrice position="end" withImage itemID={item.id} />
      </div>
    </div>
  );
};

export { CategoryItemWithoutImage };
