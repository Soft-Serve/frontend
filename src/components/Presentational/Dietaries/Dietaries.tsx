import React from "react";
import { classnames, TArg } from "tailwindcss-classnames";
import type { FC } from "react";
import { useDietaryQuery } from "@shared";
import { DietarySvg } from "@base";
import { Tooltip } from "@interface";

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

  const content = (name: string) => <div>{name}</div>;
  return (
    <div className={`flex flex-wrap items-start justify-end ${css || ""}`}>
      {data?.dietaries.map(dietary => (
        <div key={dietary.id} className="inline-flex items-center">
          <Tooltip
            isHidden={!itemAvailable}
            themeColour={themeColour}
            themeTint={themeTint}
            tooltipContent={content(dietary.name)}
          >
            <div>
              {DietarySvg(
                dietary,
                iconColour,
                themeTint,
                classnames("mx-1", "text-white", "w-8", "h-8", "p-2", css)
              )}
            </div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export { Dietaries };
