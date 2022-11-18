import React from "react";
import type { FC } from "react";
import { DietarySvg, ThemeFonts, Toggle } from "@base";
import { classnames } from "tailwindcss-classnames";
import { Allergy } from "@shared";

interface Props {
  isAllergyActive: (currentAllergy: Allergy) => boolean;
  handleClick: (allergy: Allergy) => void;
  allergy: Allergy;
  themeColour: string;
  themeTint: number;
  themeFont: ThemeFonts;
}

const AllergyButton: FC<Props> = ({
  allergy,
  handleClick,
  themeColour,
  themeTint,
  themeFont,
  isAllergyActive,
}) => {
  return (
    <div
      className={`flex w-full items-center justify-between whitespace-nowrap rounded-md border-2 bg-white p-2 shadow-md border-${themeColour}-${themeTint}`}
      onKeyDown={() => handleClick(allergy)}
      role="button"
      onClick={() => handleClick(allergy)}
      tabIndex={0}
      key={allergy.id}
    >
      <div key={allergy.id} className="inline-flex items-center">
        <div className="flex items-center">
          {DietarySvg(
            allergy,
            themeColour,
            themeTint,
            classnames("mx-1", "text-white", "w-8", "h-8", "p-2")
          )}
          <span className={`font-${themeFont} ml-2 font-bold`}>{allergy.filter_name}</span>
        </div>
      </div>
      <Toggle
        themeColour={themeColour}
        themeTint={themeTint}
        isEnabled={isAllergyActive(allergy)}
      />
    </div>
  );
};

export { AllergyButton };
