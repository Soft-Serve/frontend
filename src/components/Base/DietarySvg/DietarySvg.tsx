import React from "react";
import { TArg } from "tailwindcss-classnames";
import {
  SoySVG,
  GlutenSVG,
  NutSVG,
  DairySVG,
  VegetarianSVG,
  VeganSVG,
  ShellfishSVG,
  SesameSVG,
  EggsSVG,
  HalalSVG,
  PeanutsSVG,
  SeafoodSVG,
} from "./svgs";
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
  Vegan: VeganSVG,
  "Tree nuts": NutSVG,
  Vegetarian: VegetarianSVG,
  Shellfish: ShellfishSVG,
  Sesame: SesameSVG,
  Eggs: EggsSVG,
  Peanuts: PeanutsSVG,
  Seafood: SeafoodSVG,
  Halal: HalalSVG,
};

const DietarySvg = (dietary: Dietary, themeColour: string, themeTint: number, css?: TArg) => {
  const { name, id } = dietary;
  if (typeof Components[name] !== "undefined") {
    return React.createElement(Components[name], {
      key: id,
      className: buildSvgStyles(themeColour, themeTint, css),
    });
  }
  return null;
};

export { DietarySvg };
