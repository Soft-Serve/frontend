import React from "react";
import type { FC } from "react";
import { useItemSizeQuery } from "@shared";
import Skeleton from "react-loading-skeleton";
import { useRestaurantContext } from "src/contexts";

interface Props {
  itemID: number;
}

const ItemPrice: FC<Props> = ({ itemID }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const { themeColour, themeFont, themeTint } = useRestaurantContext();
  const { data, error, loading } = useItemSizeQuery({
    variables: {
      itemID,
    },
  });

  const renderPrice = () => {
    if (data?.itemSizes?.length === 1) {
      const singlePrice = Number(data?.itemSizes[0]?.price);

      return (
        <p
          className={`text-white font-${themeFont} p-2 bg-${themeColour}-${themeTint} rounded-md font-bold`}
        >
          {formatter.format(singlePrice)}
        </p>
      );
    }

    return (
      <div
        className={`text-white font-${themeFont} p-2 bg-${themeColour}-${themeTint} rounded-md font-bold flex flex-col`}
      >
        {data?.itemSizes?.map(item => (
          <p className="w-full inline-flex justify-between" key={item?.id}>
            <span className="mr-2">{item?.unit}</span>
            <span>{formatter.format(Number(item?.price))}</span>
          </p>
        ))}
      </div>
    );
  };

  if (loading) return <Skeleton className="m-2" count={2} width={30} height={30} />;
  if (error) return <p>errror</p>;

  return <>{renderPrice()}</>;
};

export { ItemPrice };
