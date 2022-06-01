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
  themeFont: ThemeFonts;
  size: ItemSize;
  themeColour: string;
  themeTint: number;
}

const PriceTag: FC<Props> = ({ size, themeColour, themeTint, themeFont }) => {
  const renderPrice = () => {
    return (
      <div
        className={`text-center bg-${themeColour}-${themeTint} mb-2 w-full rounded-md px-2 py-3 text-sm font-bold text-white xs:w-min font-${themeFont} xs:ml-2`}
      >
        <span>{formatPrice(size.price)}</span>
      </div>
    );
  };

  const renderPromoPrice = () => {
    return (
      <div
        className={`text-center bg-${themeColour}-${themeTint} mb-2 w-full rounded-md px-2 py-3 text-sm font-bold text-white xs:w-min font-${themeFont} flex justify-center xs:ml-2`}
      >
        <span className="mr-2 line-through">{formatPrice(size.price)}</span>
        <LightningBoltIcon className="h-5 w-5 text-white" />
        <span>{formatPrice(size.promo_price)}</span>
      </div>
    );
  };

  return <>{size?.promo_price ? renderPromoPrice() : renderPrice()}</>;
};

export { PriceTag };
