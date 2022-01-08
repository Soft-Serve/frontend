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
const ModalDietaries: FC<Props> = ({
  itemID,
  itemAvailable,
  css,
  themeTint,
  themeColour,
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
    <div className={`flex flex-col items-start ${css || ""}`}>
      <p className={`font-${themeFont} underline text-sm`}>this menu item contains:</p>
      {data?.dietaries.map(dietary => (
        <div key={dietary.id} className="inline-flex items-center">
          <div>
            {DietarySvg(
              dietary,
              iconColour,
              themeTint,
              classnames("mx-1", "text-white", "w-8", "h-8", "p-2")
            )}
          </div>
          <span className={`font-${themeFont} text-sm`}>{dietary.name}</span>
        </div>
      ))}
    </div>
  );
};

export { ModalDietaries };
