import React from "react";
import type { FC } from "react";
import { Item } from "@shared";
import { classnames } from "tailwindcss-classnames";
import { useRestaurantContext, useViewportContext } from "@contexts";
import { ItemPrice, ItemImage, Dietaries } from "@presentational";

interface Props {
  item: Item;
}

const ExampleItem: FC<Props> = ({ item }) => {
  const { width } = useViewportContext();
  const { themeFont } = useRestaurantContext();

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
      <div key={item.id} className="flex flex-col rounded-lg  overflow-hidden relative my-4">
        {renderMobileImage()}
        <div className="flex-1 bg-white p-2 flex flex-col justify-between">
          <div className="flex w-full justify-between">
            <p className={`font-bold font-${themeFont}`}>{item?.name}</p>
          </div>
          <p
            className={`font-${themeFont} italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden`}
          >
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          <ItemPrice position="end" withImage itemID={item.id} />
        </div>
      </div>
    );
  }
  return (
    <div key={item.id} className="flex rounded-lg  overflow-hidden relative my-4">
      {renderDesktopImage()}
      <div className="flex-1 bg-white p-4 flex flex-col justify-between">
        <div>
          <p className={`font-bold font-${themeFont}`}>{item?.name}</p>
          <p
            className={`font-${themeFont} italic text-gray-600 mt-2 text-sm break-words text-ellipsis overflow-hidden`}
          >
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
        </div>
        <ItemPrice position="end" withImage itemID={item.id} />
      </div>
    </div>
  );
};

export { ExampleItem };
