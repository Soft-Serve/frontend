import React from "react";
import type { FC } from "react";
import { useRestaurantContext, useViewportContext } from "@contexts";
import { ItemPrice } from "@presentational";

const ExampleItem: FC = () => {
  const { width } = useViewportContext();
  const { themeFont } = useRestaurantContext();

  const item = {
    id: 10,
    photo: "nadine-primeau--ftWfohtjNw-unsplash_pmknmk.jpg",
    available: true,
    name: "House salad",
    description: "lettuce, tomato, carrots, ranch dressing, pickled radishes",
  };

  if (width < 515) {
    return (
      <div key={item.id} className="flex flex-col rounded-lg  overflow-hidden relative my-4">
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
