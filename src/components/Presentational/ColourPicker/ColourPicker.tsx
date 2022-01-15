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
      <div className=" h-96 overflow-y-auto mb-2">
        {colourMap.map(([colour, value]) => (
          <div className="my-4" key={colour}>
            <span className="text-sm font-bold text-gray-900 mx-2 font-Quicksand">
              {camelCaseFormatter(colour)}
            </span>
            <div className="flex items-center flex-wrap">
              {Object.entries(value).map(([tailWindNumber, hexColour]) => (
                <div
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => handleClick(colour, tailWindNumber)}
                  onClick={() => handleClick(colour, tailWindNumber)}
                  key={tailWindNumber}
                  className={`bg-${colour}-${tailWindNumber} w-14 h-14 rounded-md m-2 `}
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
