import React from "react";
import { classnames, TArg } from "tailwindcss-classnames";
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
const CategoryItemDietaries: FC<Props> = ({ itemID, css, themeColour, themeTint }) => {
  const { data } = useDietaryQuery({
    variables: {
      itemID,
    },
  });

  if (!data?.dietaries?.length) return null;

  return (
    <div className={`flex  items-start mt-4 ${css || ""}`}>
      {data?.dietaries.map(dietary => (
        <div key={dietary.id} className="inline-flex items-center">
          <div>
            {DietarySvg(
              dietary,
              themeColour,
              themeTint,
              classnames("mx-1", "text-white", "w-8", "h-8", "p-2")
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { CategoryItemDietaries };
