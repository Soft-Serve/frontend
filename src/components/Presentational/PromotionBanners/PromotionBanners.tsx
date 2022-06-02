import React from "react";
import type { FC } from "react";
import { Promotion } from "@shared";
import { FloatingBanner, ThemeFonts } from "@base";
import { ClockIcon, LightningBoltIcon } from "@heroicons/react/solid";

interface Props {
  promotions?: Promotion[];
  themeFont: ThemeFonts;
  themeColour: string;
  themeTint: number;
}

const PromotionBanners: FC<Props> = ({ promotions, themeColour, themeFont, themeTint }) => {
  return (
    <>
      {promotions?.map(promo => (
        <FloatingBanner
          key={promo.id}
          themeFont={themeFont}
          themeColour={themeColour}
          themeTint={themeTint}
        >
          <div className="ml-3 flex flex-col truncate font-medium text-white">
            <div className="flex">
              <span className="mr-2 font-bold">{promo?.name}!</span>
            </div>
            <span>{promo?.description}</span>
            <div className="mt-2 flex w-full flex-wrap items-center">
              <div className="mr-4 mb-2 flex items-end text-sm ">
                <ClockIcon className="mr-1 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p className="whitespace-nowrap">
                  {" "}
                  <time className="font-bold" dateTime={new Date(promo?.start_time).toString()}>
                    {new Date(promo?.start_time).toLocaleTimeString()}
                  </time>
                  {" to "}{" "}
                  <time className="font-bold" dateTime={new Date(promo?.end_time).toString()}>
                    {new Date(promo?.end_time).toLocaleTimeString()}
                  </time>
                </p>
              </div>
            </div>
          </div>
        </FloatingBanner>
      ))}
    </>
  );
};

export { PromotionBanners };
