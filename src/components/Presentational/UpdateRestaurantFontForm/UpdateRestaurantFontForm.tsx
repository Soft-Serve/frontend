import React from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import type { FC } from "react";
import { useRestaurantContext } from "src/contexts";

const FONTS = ["sans", "Arima", "Raleway", "MarkScript"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const UpdateRestaurantFontForm: FC = () => {
  const { themeFont, setThemeFont, themeColour, themeTint } = useRestaurantContext();

  return (
    <RadioGroup value={themeFont} onChange={setThemeFont}>
      <RadioGroup.Label className="text-sm font-medium  text-gray-900">Theme font</RadioGroup.Label>

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
                    <RadioGroup.Description
                      as="span"
                      className={`mt-1 flex items-center text-sm text-gray-500 font-${font}`}
                    >
                      is it me you are looking for
                    </RadioGroup.Description>
                    <RadioGroup.Description
                      as="span"
                      className={`mt-6 text-sm font-medium text-gray-900 font-${font}`}
                    >
                      i can see it in your eyes
                    </RadioGroup.Description>
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
