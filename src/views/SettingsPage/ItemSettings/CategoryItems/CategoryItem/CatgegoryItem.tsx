import React, { useState } from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { classnames } from "tailwindcss-classnames";
import { Button, Pill, Toggle } from "@base";
import { useViewportContext } from "@contexts";
import { ItemPrice, ItemImage, Dietaries } from "@presentational";
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
  const { width } = useViewportContext();

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

  const renderDesktopImage = () =>
    item.photo ? (
      <div className="flex-shrink-0 h-full w-56 relative">
        <ItemImage className="inset-0 w-full h-full object-cover" photoUrl={item?.photo} />
        <Dietaries
          css={classnames("justify-end", "absolute", "top-0", "left-0")}
          itemAvailable={item.available}
          itemID={item.id}
        />
      </div>
    ) : (
      <Dietaries
        css={classnames("justify-end", "absolute", "top-0", "left-0")}
        itemAvailable={item.available}
        itemID={item.id}
      />
    );

  const renderMobileImage = () =>
    item.photo ? (
      <div className="flex-shrink-0 h-40 relative">
        <ItemImage
          className="inset-0 w-full h-full object-cover"
          unavailable={!item.available}
          photoUrl={item?.photo}
        />
        <Dietaries
          css={classnames("justify-end", "absolute", "top-0", "right-0")}
          itemAvailable={item.available}
          itemID={item.id}
        />
      </div>
    ) : (
      <Dietaries
        css={classnames("justify-end", "absolute", "top-0", "right-0")}
        itemAvailable={item.available}
        itemID={item.id}
      />
    );

  if (width < 515) {
    return (
      <div key={item.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden relative">
        {renderMobileImage()}
        <div
          className={`flex items-center absolute top-0 ${
            item.photo ? "left" : "right"
          }-0 rounded-md p-2 justify-between w-36`}
        >
          <Pill type={isItemAvailable ? "success" : "error"}>
            {isItemAvailable ? "Available" : "86"}
          </Pill>
        </div>
        <div className="flex-1 bg-white p-2 flex flex-col justify-between">
          <div className="flex w-full justify-between">
            <p className="font-bold font-Quicksand">{item?.name}</p>
            <Toggle isEnabled={isItemAvailable} handleClick={handleToggle} />
          </div>
          <p className="font-Quicksand italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden">
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          <ItemPrice position="start" withImage itemID={item.id} />
        </div>
        <div className="flex items-center mt-2 w-full p-2 justify-center">
          <Button
            isFullwidth
            onClick={() => handleUpdateItem(item, categoryID)}
            css="mr-2"
            colour="accent"
            size="M"
          >
            Update
          </Button>
          <Button
            size="M"
            isFullwidth
            onClick={() => handleDeleteItem(item, categoryID)}
            colour="primary"
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div key={item.id} className="flex rounded-lg shadow-lg overflow-hidden relative">
      {renderDesktopImage()}
      <div className="flex items-center absolute top-2 right-2">
        <Pill type={isItemAvailable ? "success" : "error"}>
          {isItemAvailable ? "Available" : "86"}
        </Pill>
        <Toggle isEnabled={isItemAvailable} handleClick={handleToggle} />
      </div>
      <div className="flex-1 bg-white p-4 flex flex-col justify-between">
        <div>
          <p className="font-bold font-Quicksand">{item?.name}</p>
          <p className="font-Quicksand italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden">
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          <ItemPrice position="start" withImage itemID={item.id} />
        </div>
        <div className="flex items-center mt-2 w-full justify-end">
          <Button
            size="M"
            onClick={() => handleUpdateItem(item, categoryID)}
            css="mr-2"
            colour="accent"
          >
            Update
          </Button>
          <Button size="M" onClick={() => handleDeleteItem(item, categoryID)} colour="primary">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export { CategoryItem };
