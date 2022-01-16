import React from "react";
import { classnames, TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import { useDietaryQuery } from "@shared";
import { DietarySvg } from "@base";

interface Props {
  themeColour: string;
  themeTint: number;
  itemID: number;
  itemAvailable?: boolean;
  css?: TArg;
}
const Dietaries: FC<Props> = ({ itemID, itemAvailable, css, themeColour, themeTint }) => {
  const { data } = useDietaryQuery({
    variables: {
      itemID,
    },
  });

  const iconColour = itemAvailable ? themeColour : "gray";

  if (!data?.dietaries?.length) return null;

  return (
    <div className={`flex items-start ${css || ""}`}>
      {data?.dietaries.map(dietary => (
        <div key={dietary.id} className="inline-flex items-center">
          <div>
            {DietarySvg(
              dietary,
              iconColour,
              themeTint,
              classnames("mx-1", "text-white", "w-8", "h-8", "p-2", css)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Dietaries };
