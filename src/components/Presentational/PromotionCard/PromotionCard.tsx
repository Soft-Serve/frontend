import React from "react";
import type { FC } from "react";
import { ClockIcon } from "@heroicons/react/solid";
import { PromotionCategory, usePromotionCategoriesQuery } from "./PromotionCategories.query";
import { CategoryName } from "@presentational";
import { Promotion } from "@shared";
import { PromotionDropdown } from "./PromotionDropdown";

interface MappableObject {
  [key: string]: string;
}
interface Props {
  handleUpdatePromotion: (promotion: Promotion) => void;
  handleUpdateCategories: (promotionCategories?: PromotionCategory[]) => void;
  promo: Promotion;
  themeColour: string;
  themeTint: number;
}

const getShortName = (weekday: string) => weekday.substring(0, 3);

const units = {
  percentage: "%",
  amount: "$",
} as MappableObject;

const PromotionCard: FC<Props> = ({
  promo,
  themeColour,
  themeTint,
  handleUpdatePromotion,
  handleUpdateCategories,
}) => {
  const { data } = usePromotionCategoriesQuery({
    variables: {
      promotionID: promo?.id ?? 0,
    },
    skip: !promo?.id,
  });

  const renderDiscount = (category: PromotionCategory) => {
    console.log(category);
    return (
      <div key={category.id} className="mt-2 flex items-center text-sm font-bold text-gray-500 ">
        <span>{category.discount}</span>
        <span className="mr-1">{units[category.unit]} off </span>
        <CategoryName categoryID={category?.menu_category_id} />
      </div>
    );
  };

  const renderWeekdays = () =>
    promo?.days.split(",").map(day => (
      <div
        className={`mt-4 border-l-2 border-white first:rounded-l-md last:rounded-r-md bg-${themeColour}-${themeTint}`}
        key={day}
      >
        <span className="ml-1 mr-2 flex flex-wrap p-1 text-sm font-bold uppercase text-white sm:text-base">
          {getShortName(day)}
        </span>
      </div>
    ));

  return (
    <>
      <li className="relative">
        <div className="absolute top-2 right-2">
          <PromotionDropdown
            handleUpdateCategories={() => handleUpdateCategories(data?.promotionCategories)}
            handleUpdate={() => handleUpdatePromotion(promo)}
            themeColour={themeColour}
            themeTint={themeTint}
          />
        </div>
        <div className="flex items-center overflow-visible px-4 py-4 shadow-lg sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="w-full">
              <div className="flex flex-col text-sm">
                <p className={`truncate text-lg font-bold text-${themeColour}-${themeTint}`}>
                  {promo?.name}
                </p>
                <p className="flex-shrink-0 font-normal text-gray-500">{promo?.description}</p>
              </div>
              {data?.promotionCategories?.map(cat => renderDiscount(cat))}
              <div className="mt-2 flex w-full flex-wrap items-center">
                <div className="mr-4 flex items-end text-sm text-gray-500">
                  <ClockIcon
                    className="mr-1 h-5 w-5 flex-shrink-0 text-green-400"
                    aria-hidden="true"
                  />
                  <p className="whitespace-nowrap">
                    Starts at{" "}
                    <time className="font-bold" dateTime={new Date(promo?.start_time).toString()}>
                      {new Date(promo?.start_time).toLocaleTimeString()}
                    </time>
                  </p>
                </div>
                <div className="flex items-end text-sm text-gray-500">
                  <ClockIcon
                    className="mr-1 h-5 w-5 flex-shrink-0 text-red-400"
                    aria-hidden="true"
                  />
                  <p className="whitespace-nowrap">
                    Ends at{" "}
                    <time className="font-bold" dateTime={new Date(promo?.end_time).toString()}>
                      {new Date(promo?.end_time).toLocaleTimeString()}
                    </time>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 h-full flex-shrink-0 sm:mt-0 sm:ml-5">
              <div className="flex h-full -space-x-1">{renderWeekdays()}</div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export { PromotionCard };
