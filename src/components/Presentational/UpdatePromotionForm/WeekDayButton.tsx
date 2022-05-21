import React from "react";
import type { FC } from "react";
import { Toggle } from "@base";

interface Props {
  themeColour: string;
  themeTint: number;
  isPromoActive: boolean;
  day: string;
  handleDayChange: (day: string) => void;
}
const WeekDayButton: FC<Props> = ({
  handleDayChange,
  day,
  isPromoActive,
  themeColour,
  themeTint,
}) => {
  return (
    <div
      key={day}
      className={`my-1 flex w-full items-center justify-between whitespace-nowrap rounded-md border-2 bg-white p-2 border-${themeColour}-${themeTint}`}
      role="button"
      tabIndex={0}
      onClick={() => handleDayChange(day)}
      onKeyDown={() => handleDayChange(day)}
    >
      <div className="inline-flex items-center">
        <div className="flex items-center">
          <span className={`ml-2 font-Quicksand font-bold`}>{day}</span>
        </div>
      </div>
      <Toggle themeColour={themeColour} themeTint={themeTint} isEnabled={isPromoActive} />
    </div>
  );
};

export { WeekDayButton };
