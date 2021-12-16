import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { FC } from "react";
import { useViewport } from "@hooks";
import { useRestaurantContext } from "@contexts";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  attachedLabel: string;
}
const AttachedLabelInput: FC<Props> = ({ label, attachedLabel, id, ...rest }) => {
  const { width } = useViewport();
  const isViewPortBigSize = width < 1140 && width > 1023;

  const isViewportSmalllerThenTablet = width < 527;
  const { themeColour, themeTint } = useRestaurantContext();

  if (isViewPortBigSize || isViewportSmalllerThenTablet) {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="block text-sm font-bold text-gray-900 font-Quicksand">
          {label}
        </label>
        <div className="mt-2 flex flex-col">
          <span
            className={`items-center p-3 rounded-t-md border-r-0 border-2 border-${themeColour}-${themeTint}  text-white bg-${themeColour}-${themeTint} sm:text-sm font-bold font-Quicksand`}
          >
            {attachedLabel}
          </span>
          <input
            id={id}
            className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-b-md focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} sm:text-sm border-2 border-${themeColour}-${themeTint}`}
            {...rest}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block text-sm font-bold text-gray-900 font-Quicksand">
        {label}
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <span
          className={`inline-flex  items-center px-3 rounded-l-md  border-r-0 border-2 border-${themeColour}-${themeTint}  text-white bg-${themeColour}-${themeTint}  sm:text-sm font-bold font-Quicksand`}
        >
          {attachedLabel}
        </span>
        <input
          id={id}
          className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} sm:text-sm border-2 border-${themeColour}-${themeTint}`}
          {...rest}
        />
      </div>
    </div>
  );
};

export { AttachedLabelInput };
