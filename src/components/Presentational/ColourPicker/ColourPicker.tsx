import React from "react";
import type { FC } from "react";

import type { DarkColoursMap } from "@constants";
import { Container } from "@interface";

interface Props {
  themeColour: string;
  themeTint: number;
  onClose: (state: boolean) => void;
  handleSubmit: (colour: string, tint: number) => void;
  colours: DarkColoursMap;
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

const ColourPicker: FC<Props> = ({ onClose, themeTint, themeColour, handleSubmit, colours }) => {
  const handleClick = (colour: string, tailWindNumber: string) => {
    handleSubmit(colour, Number(tailWindNumber));
    onClose(false);
  };

  return (
    <Container adjustHeight={150} isScrollable containerWidth="full">
      {colours.map(([colour, value]) => (
        <div key={`${colour}-${value}`}>
          <div className="w-full text-left md:text-center">
            <span className="text-md font-Quicksand font-bold text-gray-900">
              {camelCaseFormatter(colour)}
            </span>
          </div>
          <div className="flex flex-wrap items-center md:justify-center">
            {Object.entries(value).map(([tailWindNumber, hexColour]) => {
              const isSelected = Number(tailWindNumber) === themeTint && colour === themeColour;
              return (
                <div
                  key={hexColour}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => handleClick(colour, tailWindNumber)}
                  onClick={() => handleClick(colour, tailWindNumber)}
                  className={`bg-${colour}-${tailWindNumber} m-2 h-14 w-14 rounded-md  ${
                    isSelected ? " ring-4 ring-offset-4" : null
                  }`}
                >
                  <span className="sr-only">{hexColour}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </Container>
  );
};

export { ColourPicker };
