import React from "react";
import type { FC } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRestaurantContext } from "@contexts";
import { useUpdateRestaurantFont } from "./UpdateRestaurantFont.mutation";
import { ExampleItem } from "./ExampleItem";

const FONTS = ["Sans", "Arima", "Baskerville", "Cardo", "Oswald", "Quicksand", "Raleway"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  id: number;
}
const UpdateRestaurantFontForm: FC<Props> = ({ id }) => {
  const { themeFont, setThemeFont, themeColour, themeTint } = useRestaurantContext();

  const [updateFont] = useUpdateRestaurantFont();

  const handleChange = (font: string) => {
    setThemeFont(font);
    updateFont({
      variables: {
        input: {
          font,
          id,
        },
      },
    });
  };

  return (
    <RadioGroup value={themeFont} onChange={handleChange}>
      <RadioGroup.Label className="text-sm font-bold text-gray-900 font-Quicksand">
        Theme font
      </RadioGroup.Label>
      <ExampleItem />
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {FONTS.map(font => (
          <RadioGroup.Option
            key={font}
            value={font}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? `ring-2 ring-${themeColour}-${themeTint}` : "",
                "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <div className="flex-1 flex">
                  <div className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className={`block text-sm font-medium text-gray-900 font-${font}`}
                    >
                      {font}
                    </RadioGroup.Label>
                  </div>
                </div>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    `h-5 w-5 text-${themeColour}-${themeTint}`
                  )}
                  aria-hidden="true"
                />
                <div
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? `border-${themeColour}-${themeTint}` : "border-transparent",
                    "absolute -inset-px rounded-lg pointer-events-none"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
export { UpdateRestaurantFontForm };