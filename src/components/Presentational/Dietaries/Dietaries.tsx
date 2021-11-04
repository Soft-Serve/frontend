import React from "react";
import type { FC } from "react";
import { useDietaryQuery } from "@shared";
import { useGlobalContext } from "@contexts";
import { DietarySvg } from "@base";

interface Props {
  itemID: number;
}
const Dietaries: FC<Props> = ({ itemID }) => {
  const { themeColour, themeTint } = useGlobalContext();
  const { data } = useDietaryQuery({
    variables: {
      itemID,
    },
  });
  return <>{data?.dietaries.map(dietary => DietarySvg(dietary, themeColour, themeTint))}</>;
};

export { Dietaries };
