import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { FC } from "react";
import { useViewport } from "@hooks";

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  attachedLabel: string;
  themeColour: string;
  themeTint: number;
}
const AttachedLabelInput: FC<Props> = ({
  label,
  attachedLabel,
  themeTint,
  themeColour,
  id,
  ...rest
}) => {
  const { width } = useViewport();
  const isViewPortBigSize = width < 1140 && width > 1023;

  const isViewportSmalllerThenTablet = width < 527;

  if (isViewPortBigSize || isViewportSmalllerThenTablet) {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="block font-Quicksand text-sm font-bold text-gray-900">
          {label}
        </label>
        <div className="mt-2 flex flex-col">
          <span
            className={`items-center rounded-t-md border-2 border-r-0 p-3 border-${themeColour}-${themeTint}  text-white bg-${themeColour}-${themeTint} font-Quicksand text-sm font-bold`}
          >
            {attachedLabel}
          </span>
          <input
            id={id}
            className={`block w-full min-w-0 flex-1 rounded-none rounded-b-md px-3 py-2 focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} border-2 sm:text-sm border-${themeColour}-${themeTint}`}
            {...rest}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="block font-Quicksand text-sm font-bold text-gray-900">
        {label}
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <span
          className={`inline-flex  items-center rounded-l-md border-2  border-r-0 px-3 border-${themeColour}-${themeTint}  text-white bg-${themeColour}-${themeTint}  font-Quicksand font-bold sm:text-sm`}
        >
          {attachedLabel}
        </span>
        <input
          id={id}
          className={`block w-full min-w-0 flex-1 rounded-none rounded-r-md px-3 py-2 focus:ring-${themeColour}-${themeTint} focus:border-${themeColour}-${themeTint} border-2 sm:text-sm border-${themeColour}-${themeTint}`}
          {...rest}
        />
      </div>
    </div>
  );
};

export { AttachedLabelInput };
