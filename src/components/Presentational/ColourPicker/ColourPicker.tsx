import React from "react";
import type { FC } from "react";
import { Button } from "@base";
import { colorsMap } from "@constants";

interface Props {
  themeColour: string;
  themeTint: number;
  onClose: (state: boolean) => void;
  handleSubmit: (colour: string, tint: number) => void;
}

const capatalize = ([firstLetter, ...restOfWord]: string) =>
  [firstLetter.toUpperCase(), ...restOfWord].join("");

const findUpperCaseIndex = (array: string[]) =>
  array.findIndex(letter => letter === letter.toUpperCase());

const camelCaseFormatter = (name: string) => {
  if (findUpperCaseIndex(name.split("")) === -1) return capatalize(name);

  return `${capatalize(name.substring(0, findUpperCaseIndex(name.split(""))))} ${name.substring(
    findUpperCaseIndex(name.split(""))
  )}`;
};
const colourMap = Object.entries(colorsMap);

const ColourPicker: FC<Props> = ({ onClose, themeTint, themeColour, handleSubmit }) => {
  const handleClick = (colour: string, tailWindNumber: string) => {
    handleSubmit(colour, Number(tailWindNumber));
    onClose(false);
  };
  return (
    <div>
      <div className=" mb-2 h-96 overflow-y-auto">
        {colourMap.map(([colour, value]) => (
          <div className="my-4" key={colour}>
            <span className="mx-2 font-Quicksand text-sm font-bold text-gray-900">
              {camelCaseFormatter(colour)}
            </span>
            <div className="flex flex-wrap items-center">
              {Object.entries(value).map(([tailWindNumber, hexColour]) => (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => handleClick(colour, tailWindNumber)}
                  onClick={() => handleClick(colour, tailWindNumber)}
                  key={tailWindNumber}
                  className={`bg-${colour}-${tailWindNumber} m-2 h-14 w-14 rounded-md `}
                >
                  <span className="sr-only">{hexColour}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button
        themeColour={themeColour}
        themeTint={themeTint}
        css="mt-4"
        onClick={() => onClose(false)}
        size="XXL"
        isFullwidth
      >
        close
      </Button>
    </div>
  );
};

export { ColourPicker };
