import React, { Dispatch, SetStateAction } from "react";
import type { FC } from "react";
import { Button } from "@base";
import { colors } from "@constants";
import { useRestaurantContext } from "@contexts";

interface Props {
  onClose: (state: boolean) => void;
  setTheme: Dispatch<SetStateAction<string>>;
  setTint: Dispatch<SetStateAction<number>>;
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
const colourMap = Object.entries(colors);

const ColourPicker: FC<Props> = ({ onClose, setTheme, setTint }) => {
  const { setThemeColour, setThemeTint } = useRestaurantContext();

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
                  onKeyDown={() => {
                    setThemeColour(colour);
                    setThemeTint(Number(tailWindNumber));
                    setTheme(colour);
                    setTint(Number(tailWindNumber));
                    onClose(false);
                  }}
                  onClick={() => {
                    setThemeColour(colour);
                    setThemeTint(Number(tailWindNumber));
                    setTheme(colour);
                    setTint(Number(tailWindNumber));
                    onClose(false);
                  }}
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
      <Button css="mt-4" onClick={() => onClose(false)} size="XXL" isFullwidth>
        close
      </Button>
    </div>
  );
};

export { ColourPicker };
