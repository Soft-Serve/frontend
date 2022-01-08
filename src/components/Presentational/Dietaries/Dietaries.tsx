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
    <div className={`flex items-center p-2 ${css}`}>
      {data?.dietaries.map(dietary =>
        DietarySvg(
          dietary,
          iconColour,
          themeTint,
          classnames("mx-1", "bg-white", "rounded-md", "w-8", "h-8", "p-2")
        )
      )}
    </div>
  );
};

export { Dietaries };
