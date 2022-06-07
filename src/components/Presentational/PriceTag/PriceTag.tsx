import React from "react";
import type { FC } from "react";
import { ItemSize } from "src/shared";
import { ThemeFonts } from "@base";
import { LightningBoltIcon } from "@heroicons/react/solid";

const { format } = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatPrice = (price?: string) => format(Number(price));

interface Props {
  isMultiSize?: boolean;
  themeFont: ThemeFonts;
  size: ItemSize;
  themeColour: string;
  themeTint: number;
}

const PriceTag: FC<Props> = ({ isMultiSize, size, themeColour, themeTint, themeFont }) => {
  const renderSize = () => {
    if (isMultiSize) {
      return <span className="mr-1 whitespace-nowrap">{size.unit}</span>;
    }
    return null;
  };
  const renderPrice = () => {
    return (
      <div
        className={`text-center bg-${themeColour}-${themeTint} mb-2 w-min rounded-md px-1.5 py-2 text-xs font-bold text-white sm:px-2 sm:py-3 sm:text-sm font-${themeFont} ml-2`}
      >
        {renderSize()}
        <span>{formatPrice(size.price)}</span>
      </div>
    );
  };

  const renderPromoPrice = () => {
    return (
      <div
        className={`text-center bg-${themeColour}-${themeTint} mb-2 w-min rounded-md px-1.5 py-2 text-xs font-bold text-white sm:px-2 sm:py-3 sm:text-sm font-${themeFont} ml-2 flex items-start whitespace-nowrap`}
      >
        {renderSize()}
        <span className=" mx-1 line-through">{formatPrice(size.price)}</span>
        {formatPrice(size.promo_price)}
        <LightningBoltIcon className="ml-1 h-3 w-3 text-white sm:h-4 sm:w-4" />
      </div>
    );
  };

  return <>{size?.promo_price ? renderPromoPrice() : renderPrice()}</>;
};

export { PriceTag };
