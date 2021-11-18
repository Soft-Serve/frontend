import React from "react";
import type { FC } from "react";
import { useDietaryQuery } from "@shared";
import { useRestaurantContext } from "@contexts";
import { DietarySvg } from "@base";

interface Props {
  itemID: number;
  itemAvailable?: boolean;
}
const Dietaries: FC<Props> = ({ itemID, itemAvailable }) => {
  const { themeColour, themeTint } = useRestaurantContext();
  const { data } = useDietaryQuery({
    variables: {
      itemID,
    },
  });

  const iconColour = itemAvailable ? themeColour : "gray";

  return <>{data?.dietaries.map(dietary => DietarySvg(dietary, iconColour, themeTint))}</>;
};

export { Dietaries };
