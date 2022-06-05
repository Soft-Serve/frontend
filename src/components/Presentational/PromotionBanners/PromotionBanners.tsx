import React from "react";
import type { FC } from "react";
import { Promotion } from "@shared";
import { FloatingBanner, ThemeFonts } from "@base";
import { ClockIcon, LightningBoltIcon } from "@heroicons/react/solid";

interface Props {
  promotion?: Promotion;
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
}

const PromotionBanners: FC<Props> = ({ promotion, themeColour, themeFont, themeTint }) => {
  if (!promotion) return null;
  return (
    <FloatingBanner
      key={promotion?.id}
      themeFont={themeFont}
      themeColour={themeColour}
      themeTint={themeTint}
    >
      <div className="ml-3 flex flex-col font-medium text-white">
        <div className="flex">
          <span className="mr-2 font-bold">{promotion?.name}!</span>
        </div>
        <span>{promotion?.description}</span>
        <div className="mt-2 flex w-full flex-wrap items-center">
          <div className="mr-4 mb-2 flex items-end text-sm ">
            <ClockIcon className="mr-1 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <p className="whitespace-nowrap">
              {" "}
              <time className="font-bold" dateTime={promotion?.start_time}>
                {promotion?.start_time}
              </time>
              {" to "}{" "}
              <time className="font-bold" dateTime={promotion?.end_time}>
                {promotion?.end_time}
              </time>
            </p>
          </div>
        </div>
      </div>
    </FloatingBanner>
  );
};

export { PromotionBanners };
