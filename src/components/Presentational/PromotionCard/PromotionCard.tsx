import React from "react";
import type { FC } from "react";
import { ClockIcon } from "@heroicons/react/solid";

import { PostPromotionCategoryForm, PromotionCategories } from "@presentational";
import { Promotion } from "@shared";
import { PromotionDropdown } from "./PromotionDropdown";
import { Card } from "@base";

interface Props {
  handleUpdatePromotion: (promotion: Promotion) => void;
  handleDeletePromotion: (promotion: Promotion) => void;

  promo: Promotion;
  themeColour: string;
  themeTint: number;
  restaurantSlug: string;
}

interface MappableObject {
  [key: string]: number;
}

const map = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
} as MappableObject;

const sortWeekDays = (weekdays: string[]) => weekdays.sort((a, b) => map[a] - map[b]);

const getShortName = (weekday: string) => weekday.substring(0, 3);

const PromotionCard: FC<Props> = ({
  promo,
  themeColour,
  themeTint,
  handleUpdatePromotion,
  handleDeletePromotion,
  restaurantSlug,
}) => {
  const renderWeekdays = () =>
    sortWeekDays(promo?.days.split(",")).map(day => (
      <div
        className={`mt-4 border-l-2 border-white first:rounded-l-md last:rounded-r-md bg-${themeColour}-${themeTint}`}
        key={day}
      >
        <span className="ml-1 mr-1 flex p-1 text-xs font-bold uppercase text-white sm:mr-2 sm:text-base">
          {getShortName(day)}
        </span>
      </div>
    ));

  return (
    <li>
      <Card isOverflowHidden={false} css={"relative"}>
        <div className="absolute top-2 right-2">
          <PromotionDropdown
            handleDelete={() => handleDeletePromotion(promo)}
            handleUpdate={() => handleUpdatePromotion(promo)}
            themeColour={themeColour}
            themeTint={themeTint}
          />
        </div>
        <div className="flex w-full flex-col font-Quicksand text-sm">
          <p className={`truncate text-lg font-bold text-${themeColour}-${themeTint}`}>
            {promo?.name}
          </p>
          <p className="flex-shrink-0 font-normal text-gray-500">{promo?.description}</p>
          <div className="mt-2 flex w-full flex-wrap items-center">
            <div className="mr-4 flex items-end text-sm text-gray-500">
              <ClockIcon className="mr-1 h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
              <p className="whitespace-nowrap">
                Starts at{" "}
                <time className="font-bold" dateTime={promo?.start_time}>
                  {promo?.start_time}
                </time>
              </p>
            </div>
            <div className="flex items-end text-sm text-gray-500">
              <ClockIcon className="mr-1 h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" />
              <p className="whitespace-nowrap">
                Ends at{" "}
                <time className="font-bold" dateTime={promo?.end_time}>
                  {promo?.end_time}
                </time>
              </p>
            </div>
          </div>
          <div className="mb-4 flex">{renderWeekdays()}</div>
          <PromotionCategories
            themeColour={themeColour}
            themeTint={themeTint}
            promotionID={promo.id}
          />
          <PostPromotionCategoryForm
            promoName={promo.name}
            promotionID={promo.id}
            restaurantSlug={restaurantSlug}
            themeColour={themeColour}
            themeTint={themeTint}
          />
        </div>
      </Card>
    </li>
  );
};

export { PromotionCard };
