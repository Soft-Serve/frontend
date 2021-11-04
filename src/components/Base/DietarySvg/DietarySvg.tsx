import React from "react";
import { SoySVG, GlutenSVG, NutSVG, DairySVG, MeatSVG, ShellfishSVG } from "./svgs";
import { buildSvgStyles } from "./styles";

type SVG = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

type DietaryMap = {
  [key: string]: SVG;
};

interface Dietary {
  id: number;
  name: string;
  __typename: string;
}

const Components: DietaryMap = {
  Soy: SoySVG,
  Gluten: GlutenSVG,
  Lactose: DairySVG,
  "Animal by products": MeatSVG,
  Nut: NutSVG,
  Meat: MeatSVG,
  Shellfish: ShellfishSVG,
};

const DietarySvg = (dietary: Dietary, themeColour: string, themeTint: number) => {
  const { name, id } = dietary;
  if (typeof Components[name] !== "undefined") {
    return React.createElement(Components[dietary.name], {
      key: id,
      className: buildSvgStyles(themeColour, themeTint),
    });
  }
  return null;
};

export { DietarySvg };
