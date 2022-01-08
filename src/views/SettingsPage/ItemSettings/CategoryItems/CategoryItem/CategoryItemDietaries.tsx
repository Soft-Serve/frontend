import React from "react";
import { TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import { useDietaryQuery } from "@shared";
import { DietarySvg } from "@base";

interface Props {
  itemID: number;
  itemAvailable?: boolean;
  css?: TArg;
  themeColour: string;
  themeTint: number;
  themeFont: string;
}
const CategoryItemDietaries: FC<Props> = ({
  itemID,
  itemAvailable,
  css,
  themeColour,
  themeTint,
  themeFont,
}) => {
  const { data } = useDietaryQuery({
    variables: {
      itemID,
    },
  });

  const iconColour = itemAvailable ? themeColour : "gray";

  if (!data?.dietaries?.length) return null;

  return (
    <div className={`flex flex-col items-start mt-4 ${css || ""}`}>
      {data?.dietaries.map(dietary => (
        <div key={dietary.id} className="flex items-center w-full my-1">
          {DietarySvg(dietary, iconColour, themeTint)}
          <span className={`font-${themeFont} text-sm ml-2`}>{dietary.name}</span>
        </div>
      ))}
    </div>
  );
};

export { CategoryItemDietaries };
