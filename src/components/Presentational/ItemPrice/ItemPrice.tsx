import React from "react";
import type { FC } from "react";
import { useItemSizeQuery } from "@shared";
import Skeleton from "react-loading-skeleton";

interface Props {
  themeFont: string;
  themeColour: string;
  themeTint: number;
  itemID: number;
  withImage?: boolean;
  position?: "end" | "start";
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ItemPrice: FC<Props> = ({
  itemID,
  withImage,
  position = "end",
  themeColour,
  themeTint,
  themeFont,
}) => {
  const { data, error, loading } = useItemSizeQuery({
    variables: {
      itemID,
    },
  });

  const renderPrice = () => {
    if (withImage && data?.itemSizes?.length && data.itemSizes.length > 1) {
      return (
        <div
          className={`text-white font-${themeFont} flex flex-wrap bg-white text-sm font-bold justify-${position}`}
        >
          {data?.itemSizes?.map(item => (
            <p
              className={`mr-2 inline-flex justify-between last:mr-0 bg-${themeColour}-${themeTint} mb-2 rounded-md p-2`}
              key={item?.id}
            >
              <span className="mr-2 ">{item?.unit}</span>
              <span>{formatter.format(Number(item?.price))}</span>
            </p>
          ))}
        </div>
      );
    }
    if (data?.itemSizes?.length === 1) {
      const singlePrice = Number(data?.itemSizes[0]?.price);

      return (
        <div className={`flex w-full bg-white font-${themeFont} text-sm justify-${position} mb-2`}>
          <p
            className={`p-2 text-white bg-${themeColour}-${themeTint} inline-flex rounded-md font-bold`}
          >
            {formatter.format(singlePrice)}
          </p>
        </div>
      );
    }

    return (
      <div
        className={`text-white font-${themeFont}  bg-${themeColour}-${themeTint} flex flex-col rounded-md text-sm font-bold `}
      >
        {data?.itemSizes?.map(item => (
          <p className="inline-flex w-full justify-between" key={item?.id}>
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
