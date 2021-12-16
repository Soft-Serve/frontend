import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { Button, Card, CardContent, Pill, Toggle } from "@base";
import { ItemPrice, ItemImage } from "@presentational";
import { useUpdateItemAvailability } from "./UpdateItemAvailability.mutation";

interface Props {
  handleDeleteItem: (item: Item, categoryID: number) => void;
  handleUpdateItem: (item: Item, categoryID: number) => void;
  categoryID: number;
  item: Item;
}

const CategoryItem: FC<Props> = ({ handleDeleteItem, categoryID, handleUpdateItem, item }) => {
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
    <Card key={item.id} withPadding={false}>
      <div className="md:flex-shrink-0 ">
        <ItemImage className="h-48 w-full object-cover " photoUrl={item.photo} />
      </div>
      <CardContent>
        <div className="flex flex-col h-full justify-between w-full p-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="block text-lg leading-tight font-bold text-black font-Quicksand ">
                {item.name}
              </span>
              <div className="flex items-center">
                <Pill type={isItemAvailable ? "success" : "error"}>
                  {isItemAvailable ? "Available" : "86"}
                </Pill>
                <Toggle isEnabled={isItemAvailable} handleClick={handleToggle} />
              </div>
            </div>
            <p className="mt-2 text-gray-500 break-words italic font-Quicksand">
              {item.description}
            </p>
          </div>
          <div className="flex items-center flex-wrap w-full">
            <ItemPrice itemID={item.id} />
          </div>
          <div className="flex items-center mt-2 justify-end">
            <Button onClick={() => handleUpdateItem(item, categoryID)} css="mr-2" colour="accent">
              Update
            </Button>
            <Button onClick={() => handleDeleteItem(item, categoryID)} colour="primary">
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CategoryItem };
