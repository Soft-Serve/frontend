import React from "react";
import type { FC } from "react";
import { useViewportContext } from "@contexts";
import { ThemeFonts } from "@base";

interface Props {
  themeColour: string;
  themeFont: ThemeFonts;
  themeTint: number;
}
const ExampleItem: FC<Props> = ({ themeFont, themeColour, themeTint }) => {
  const { width } = useViewportContext();

  const item = {
    id: 10,
    photo: "nadine-primeau--ftWfohtjNw-unsplash_pmknmk.jpg",
    available: true,
    name: "House salad",
    description: "lettuce, tomato, carrots, ranch dressing, pickled radishes",
  };

  if (width < 515) {
    return (
      <div key={item.id} className="relative my-4 flex  flex-col overflow-hidden rounded-lg">
        <div className="flex flex-1 flex-col justify-between bg-white p-2">
          <div className="flex w-full justify-between">
            <p className={`font-bold font-${themeFont}`}>{item?.name}</p>
          </div>
          <p
            className={`font-${themeFont} mt-2 overflow-hidden text-ellipsis break-words text-sm italic text-gray-600`}
          >
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
          <div className={`my-2 flex w-full bg-white font-${themeFont} justify-end text-sm`}>
            <p
              className={`p-2 text-white bg-${themeColour}-${themeTint} inline-flex rounded-md font-bold`}
            >
              $16.00
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div key={item.id} className="relative my-4  flex overflow-hidden rounded-lg shadow-md">
      <div className="flex flex-1 flex-col justify-between bg-white p-4">
        <div>
          <p className={`font-bold font-${themeFont}`}>{item?.name}</p>
          <p
            className={`font-${themeFont} mt-2 overflow-hidden text-ellipsis break-words text-sm italic text-gray-600`}
          >
            {item.available ? item.description : "** Temporarily unavailable  **"}
          </p>
        </div>
        <div className={`my-2 flex w-full bg-white font-${themeFont} justify-end text-sm`}>
          <p
            className={`p-2 text-white bg-${themeColour}-${themeTint} inline-flex rounded-md font-bold`}
          >
            $16.00
          </p>
        </div>
      </div>
    </div>
  );
};

export { ExampleItem };
